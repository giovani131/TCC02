const pool = require("../config/db");
const { Reserva,ReservaRequestDTO, ReservaProcess, ReservaRequest, ProcessDTO } = require("../models/Reserve");
const QRCode = require("qrcode");
const { v4 } = require("uuid");
const emailService = require("../services/emailServico")

function parseDataBrParaIso(dateBr) {
  if (!dateBr) return null;
  const [dia, mes, ano] = dateBr.split("/");
  return `${ano}-${mes}-${dia}`;
}

async function gerarProcesso(
  estabelecimento_id,
  usuario_id,
  quantidade_pessoas,
  nome_responsavel,
  telefone_responsavel,
  observacao,
  data_solicitado,
  tipo,
  email_responsavel
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const pegarEstabelecimentoQuery = `
      SELECT * FROM estabelecimentos WHERE id_estabelecimento = $1
    `;
    const estabelecimentoResposta = await client.query(pegarEstabelecimentoQuery, [estabelecimento_id]);

    if (estabelecimentoResposta.rows.length <= 0) {
      throw new Error("Estabelecimento não encontrado.");
    }

     const tempoLimite = 30;

    const inserirReserva = `
      INSERT INTO Reserva
        (codigo_reserva, status, entrada_inicial, usuario_id, tempo_limite, estabelecimento_id)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const valuesReserva = [
      v4(), 
      3,
      100, 
      usuario_id,
      tempoLimite,
      estabelecimento_id,
    ];

    const respostaReserva = await client.query(inserirReserva, valuesReserva);
    const reservaRow = respostaReserva.rows[0];

    if (!reservaRow) {
      throw new Error("Erro ao criar Reserva.");
    }



    const inserirRequest = `
      INSERT INTO ReservaRequest
        (quantidade_pessoas, usuario_id, nome_responsavel, telefone_responsavel, status, criado_em, estabelecimento_id, reserva_id, observacao, data_solicitado, tipo, email_responsavel)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const valuesRequest = [
      quantidade_pessoas,
      usuario_id,
      nome_responsavel,
      telefone_responsavel,
      2, 
      new Date(),
      estabelecimento_id,
      reservaRow.id,
      observacao,
      data_solicitado,
      tipo,
      email_responsavel
    ];

    const respostaRequest = await client.query(inserirRequest, valuesRequest);
    const requestRow = respostaRequest.rows[0];

    if (!requestRow) {
      throw new Error("Erro ao criar ReservaRequest.");
    }
   
    await client.query("COMMIT");

    return {
      request: requestRow,
      reserva: reservaRow,
    };
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Erro ao executar ROLLBACK:", rollbackError);
    }

    console.error("Erro ao gerar processo de reserva:", error);
    throw error; 
  } finally {
    client.release();
  }
}

async function reserva_mesa(mesa_id, data, hora_inicio, hora_fim, reserva_request_id, estabelecimento_id, comentario, observacao, tipo)
{
  const client = await pool.connect();
  try{
    client.query("BEGIN")
    console.log(reserva_request_id)
    const getReserva = `SELECT * FROM reservarequest rr where rr.id = $1`
    const reserva = await pool.query(getReserva, [reserva_request_id])
    if(reserva.rows.length <= 0)
      throw new Error("Reserva não encontrada.")

    const getMesa = `SELECT * FROM Mesa m where m.id = $1`
    const getMesaResponse = await pool.query(getMesa, [mesa_id])
    if(getMesaResponse.rows.length <= 0)
      throw new Error(getMesaResponse)

    // const configuracoesEstabelecimento = `SELECT * FROM 
    //                                       ConfiguracaoEstabelecimento ce 
    //                                       where 
    //                                       ce.estabelecimento_id = $1`
    // const configuracoesEstabelecimentoResponse = await pool.query(configuracoesEstabelecimento, [estabelecimento_id])
    // if(configuracoesEstabelecimentoResponse.rows.length <= 0)
    //   throw new Error("Configuracoes não encontrada.")

    const verificarDisponibilidade = `SELECT * FROM 
                                      mesa_slot ms 
                                      where ms.data = $1 
                                      and 
                                      ms.hora_inicio = $2
                                      and ms.mesa_id = $3`
    const verificarDisponibilidadeResponse = await pool.query(verificarDisponibilidade, [data, hora_inicio, mesa_id])
    if(verificarDisponibilidadeResponse.rows.length >= 1)
      throw new Error("Já existe cadastrado de reserva para este dia e horario.")

    const query = `INSERT INTO Mesa_Slot 
                  (
                    mesa_id, 
                    data, 
                    hora_inicio, 
                    hora_fim, 
                    status, 
                    reserva_id,
                    tipo
                  )
                  VALUES
                  (
                    $1, 
                    $2, 
                    $3, 
                    $4, 
                    $5, 
                    $6,
                    $7
                  )
        RETURNING *`
    const queryResponse = await pool.query(query, [mesa_id, data, hora_inicio, null, 1, reserva.rows[0].reserva_id, tipo])
    if(queryResponse.rows.length <= 0)
      throw new Error("Algo deu errado.")

    const editarReseva = `UPDATE reserva SET 
                          status = $1, 
                          data_reserva = $2, 
                          hora_inicio = $3, 
                          comentario = $4, 
                          entrada_inicial = $5,
                          tempo_limite = $6
                          where id = $7
                          RETURNING *`

    const editarReservaResponsee = await pool.query(
      editarReseva, 
      [
        4,
        data, 
        hora_inicio, 
        comentario, 
        100,
        60,
        reserva.rows[0].reserva_id,
      ])

    if(editarReservaResponsee.rows.length <= 0)
      throw new Error("Algo deu errado.")

    const editarReservaRequest = `UPDATE reservarequest SET
                                  respondido_por = $1,
                                  respondido_em = $2,
                                  observacao = $3,
                                  status = $4
                                  where reserva_id = $5
                                  RETURNING *`
    const editarReservaRequestResponse = await pool.query(
      editarReservaRequest, 
      [
        estabelecimento_id,
        new Date(),
        observacao,
        1,
        reserva.rows[0].reserva_id
      ])

    if(editarReservaRequestResponse.rows.length <= 0)
      throw new Error("Algo deu errado")

      const qrCode = await gerarQrCodeFake("Mesaja");
      if (!qrCode) {
        throw new Error("Erro ao gerar QR Code.");
      }
      const inserirProcess = `
        INSERT INTO ReservaProcess
          (transaction_id, transaction_reference, paid_amout, pixqrcodeimage, pixqrcodecopy, status, date_request, reserva_id)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const valuesProcess = [
        v4(),
        v4(),
        0, 
        qrCode, 
        `MESAJA-${v4()}`, 
        1, 
        new Date(),
        reserva.rows[0].reserva_id
      ];

      const respostaProcess = await pool.query(inserirProcess, valuesProcess);
      const processRow = respostaProcess.rows[0];

      if (!processRow) {
        throw new Error("Erro ao criar processo de reserva.");
      }

      const mesaQuery = `SELECT * FROM Mesa m where m.id = $1`
      const mesaQueryResponse = await pool.query(mesaQuery, [mesa_id])

      if(mesaQueryResponse.rows.length <= 0)
        throw new Error("Mesa não encontrada.")

      const editarMesa = `UPDATE Mesa SET status = 2 where id = $1 RETURNING *`

      await pool.query(editarMesa, [mesa_id])
      await client.query("COMMIT");

      const template = `
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>Reserva Confirmada - MesaJá</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f3f4f6;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding:24px 16px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:20px 24px;color:#ffffff;">
                        <h1 style="margin:0;font-size:20px;">Reserva confirmada 🎉</h1>
                        <p style="margin:4px 0 0;font-size:13px;opacity:.9;">
                          Olá, <strong>{{NOME_CLIENTE}}</strong>! Sua reserva foi confirmada pelo restaurante.
                        </p>
                      </td>
                    </tr>

                    <!-- Corpo -->
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0 0 12px;font-size:14px;color:#374151;">
                          Abaixo estão os detalhes da sua reserva:
                        </p>

                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:13px;color:#111827;margin-bottom:16px;">
                          <tr>
                            <td style="padding:4px 0;color:#6b7280;">Data:</td>
                            <td style="padding:4px 0;"><strong>{{DATA_RESERVA}}</strong></td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0;color:#6b7280;">Horário:</td>
                            <td style="padding:4px 0;"><strong>{{HORA_RESERVA}}</strong></td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0;color:#6b7280;">Quantidade de pessoas:</td>
                            <td style="padding:4px 0;"><strong>{{QUANTIDADE_PESSOAS}}</strong></td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0;color:#6b7280;">Mesa / Área:</td>
                            <td style="padding:4px 0;"><strong>{{MESA_AREA}}</strong></td>
                          </tr>
                          <tr>
                            <td style="padding:4px 0;color:#6b7280;">Código da reserva:</td>
                            <td style="padding:4px 0;"><strong>{{CODIGO_RESERVA}}</strong></td>
                          </tr>
                        </table>

                        <!-- Pagamento / Entrada -->
                        <div style="border-radius:10px;border:1px solid #e5e7eb;background:#f9fafb;padding:12px 14px;margin-bottom:16px;">
                          <p style="margin:0 0 6px;font-size:13px;color:#111827;font-weight:600;">
                            Pagamento de entrada / garantia
                          </p>
                          <p style="margin:0 0 8px;font-size:12px;color:#4b5563;">
                            Para confirmar totalmente sua reserva, é necessário realizar o pagamento da entrada/garantia no valor de
                            <strong>{{VALOR_ENTRADA}}</strong>.
                          </p>
                          <p style="margin:0 0 10px;font-size:12px;color:#4b5563;">
                            Clique no botão abaixo para acessar o link de pagamento:
                          </p>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td align="left">
                                <a href="{{LINK_PAGAMENTO}}" target="_blank"
                                  style="display:inline-block;padding:10px 18px;border-radius:999px;background:#4f46e5;color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;">
                                  Pagar entrada da reserva
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- Observações -->
                        <div style="border-radius:10px;border:1px solid #e5e7eb;background:#f9fafb;padding:12px 14px;">
                          <p style="margin:0 0 6px;font-size:13px;color:#111827;font-weight:600;">
                            Informações importantes
                          </p>
                          <ul style="margin:0;padding-left:18px;font-size:12px;color:#4b5563;">
                            <li>Leve um documento com foto no dia da reserva.</li>
                            <li>O restaurante poderá manter a mesa reservada até <strong>{{TEMPO_TOLERANCIA}}</strong> após o horário marcado.</li>
                            <li>Em caso de atraso maior, a reserva poderá ser liberada para outros clientes.</li>
                            <li>Para remarcar ou cancelar, entre em contato com o restaurante com antecedência.</li>
                          </ul>
                        </div>

                        <p style="margin:16px 0 0;font-size:12px;color:#6b7280;">
                          Qualquer dúvida, responda este e-mail ou fale diretamente com o restaurante.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:12px 24px 18px;border-top:1px solid #e5e7eb;background:#f9fafb;">
                        <p style="margin:0;font-size:11px;color:#9ca3af;">
                          Enviado por <strong>MesaJá</strong> • Gestão de reservas para restaurantes.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
          `;

    
    const html = template
      .replace(/{{NOME_CLIENTE}}/g, reserva.rows[0].nome_responsavel)
      .replace(/{{DATA_RESERVA}}/g, String(data))
      .replace(/{{HORA_RESERVA}}/g, String(hora_inicio))
      .replace(/{{QUANTIDADE_PESSOAS}}/g, String(reserva.rows[0].quantidade_pessoas))
      .replace(/{{MESA_AREA}}/g, getMesaResponse.rows[0].codigo_mesa)
      .replace(/{{CODIGO_RESERVA}}/g, editarReservaResponsee.rows[0].codigo_reserva)
      .replace(/{{VALOR_ENTRADA}}/g, "R$ 100,00")
      .replace(/{{LINK_PAGAMENTO}}/g, `http://localhost:3000/payment/${respostaProcess.rows[0].transaction_id}`)
      .replace(/{{TEMPO_TOLERANCIA}}/g, "30 minutos")

    await emailService.sendMail(
      reserva.rows[0].email_responsavel, // garante que é um e-mail aqui
      "Sua reserva foi confirmada",
      html
    );

    return {
      reserva: editarReservaResponse.rows[0],
      reservaRequest: editarReservaRequestResponse.rows[0],
      process: processRow,
    };
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Erro ao executar ROLLBACK:", rollbackError);
    }

    console.error("Erro ao gerar processo de reserva:", error);
    throw error; 
  } finally {
    client.release();
  }
}

async function getProcess(id){
    const query = `select 
                    r.id,
                    r.data_reserva,
                    r.hora_inicio,
                    e.cpf_responsavel,
                    e.endereco_num,
                    e.endereco_rua,
                    e.nome_restaurante,
                    r2.transaction_id,
                    r2.transaction_reference,
                    r2.paid_amout,
                    r2.pixqrcodeimage,
                    r2.pixqrcodecopy,
                    r2.status,
                    r3.quantidade_pessoas,
                    r3.nome_responsavel,
                    r3.telefone_responsavel,
                    r3.status
                    from reserva r 
                    inner join reservaprocess r2 on r2.reserva_id  = r.id 
                    inner join reservarequest r3 on r3.reserva_id  = r.id
                    inner join estabelecimentos e on r.estabelecimento_id = e.id_estabelecimento
                    where r.codigo_reserva = $1 `
    const resposta = await pool.query(query, [id])
    return new ProcessDTO(resposta.rows[0])
}

async function fakePayment(process_id)
{
    const query = `SELECT * FROM reservaprocess rp where rp.id = $1`
    const queryResponse = await pool.query(query, [process_id])
    if(queryResponse.rows.length <= 0 || queryResponse.rows[0].status != 3)
      throw new Error("Processo não encontrado.")

    const queryChangeStatus = `UPDATE reservaprocess rp where rp.status = 1 returning *`
    const queryChangeStatusResponse = await pool.query(queryChangeStatus)

    return queryChangeStatusResponse.rows[0]
}

async function listReservas(estabelecimento_id, status, tipo)
{
  const query = `SELECT * FROM reservarequest rr where rr.estabelecimento_id = $1 and rr.status = $2 and rr.tipo = $3 order by rr.criado_em desc`
  const queryResponse = await pool.query(query, [estabelecimento_id, status, tipo])
  console.log(queryResponse.rows)

  return queryResponse.rows.map((item) => new ReservaRequestDTO(item))
}

async function getAllReserveByMesaId(mesa_id) {
  const today = new Date().toISOString().split("T")[0];

  const query = `
    SELECT *
    FROM mesaslot ms
    WHERE ms.mesa_id = $1
      AND ms.data = $2
  `;

  const queryResponse = await pool.query(query, [mesa_id, today]);
  return queryResponse.rows;
}


async function getAllReservaRequest()
{
  const query = `SELECT * FROM reservarequest rr where rr.estabelecimento_id = $1 and status = 3`
  const queryResponse = await pool.query(query)

  return queryResponse.rows[0]
}

async function getAllReserva(status)
{
  const query = `SELECT * FROM reserva r where r.estabelecimento_id = $1 and r.status = $2`
  const queryResponse = await pool.query(query)

  return queryResponse.rows[0]
}

async function getReservaDetails(reserva_id){
  const query = `
                  SELECT * FROM reserva r
                  r.id,
                  rr.nome_responsavel,
                  rr.telefone_responsavel,
                  rr.comentarios
                  inner join reservarequest rr on rr.reserva_id = r.id
                  inner join reservaprocess rp on rp.reserva_id = r.id
                  where r.id = $1
                `
}

async function gerarQrCodeFake(name) {
  const payloadFake = `${name}-${v4()}`;
  const imagemBase64 = await QRCode.toDataURL(payloadFake);
  return imagemBase64;
}

module.exports = { gerarProcesso, getProcess, reserva_mesa, fakePayment, listReservas, getAllReserveByMesaId, getAllReservaRequest, getAllReserva };
