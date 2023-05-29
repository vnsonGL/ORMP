const { getClient } = require("../config/postgres");
exports.getInfoEmployee = async function (phone) {
  const client = await getClient();
  const rs = await client.query(
    'select * from public."Employees" where "PHONE" = $1',
    [phone]
  );
  return rs.rows;
};

exports.getCountContract = async function () {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*)  FROM public."Contract"');
  return rs.rows[0];
};

exports.getCountContractPendingApproval = async function () {
  const client = await getClient();
  const rs = await client.query(
    'SELECT COUNT(*)  FROM public."Contract" WHERE "STATUS" = $1', ["Chưa duyệt"]
  );
  return rs.rows[0];
};

exports.getListContract = async function (skip, limit) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT CT."ID_CONTRACT",P."Name" AS "Tên Doanh Nghiệp" FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."STATUS" = $3   OFFSET $1 LIMIT $2 ',
    [skip, limit, "Đã duyệt"]
  );
  return rs.rows;
};

exports.getListContractPendingApproval = async function (skip, limit) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT CT."ID_CONTRACT",P."Name" AS"Tên Doanh Nghiệp" FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."STATUS" = $3   OFFSET $1 LIMIT $2 ',
    [skip, limit, "Chưa duyệt"]
  );
  return rs.rows;
};

exports.getContract = async function (id) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT CT."ID_CONTRACT",CT."DATE_CONTRACT" AS "Ngày lập HĐ" ,CT."EFFECTIVE_TIME" AS "Ngày hết HĐ",CT."AMOUNTTOPOINTS" AS "Đơn vị đổi",CT."COMMISSION" AS "% giao dịch",CT."CONTRACT_MANAGER" AS "Nhân viên quản lý hợp đồng",P."Name" AS "Tên doanh nghiệp",P."url" AS "Image"  FROM public."Contract" as CT , public."Partners" as P WHERE CT."CONTRACT_PARTNER" = P."ID_Partners" AND CT."STATUS" = $1 AND CT."ID_CONTRACT" = $2 ',
    ["Đã duyệt", id]
  );
  return rs.rows[0];
};

exports.getListPartner = async function (skip, limit) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT * FROM public."Partners"  OFFSET $1 LIMIT $2 ',
    [skip, limit]
  );
  return rs.rows;
};

exports.getCountPartner = async function () {
  const client = await getClient();
  const rs = await client.query(' SELECT COUNT(*)  FROM public."Partners"');
  return rs.rows[0];
};

exports.getPartner = async function (id) {
  const client = await getClient();
  const rs = await client.query(
    'SELECT * FROM public."Partners" WHERE "ID_Partners" = $1 ',
    [id]
  );
  return rs.rows[0];
};

exports.getListPartnerProduct = async function (id) {
  const client = await getClient();
  const rs = await client.query(
    'select p.*,tp."type_prod",ip."url" as "img" from public."exchange_point" as ep, public."products" as p, public."type_products" as tp, public."image_product" as ip where ep."id_products" = p."id_products" and ep."id_partners" = $1 and tp."id_products" = p."id_products" and ip."id_products" = p."id_products" and ip."stt" = $2',
    [id, 1]
  );
  return rs.rows;
};

exports.updateContract = async function (id) {
  const client = await getClient();

  const rs1 = await client.query('UPDATE public."Contract" SET "STATUS" = $1 WHERE "ID_CONTRACT" = $2', ["Đã duyệt", id]);
};