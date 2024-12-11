const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req: any, res: any) => {
  const result = await sql`SELECT * from lists`;
 
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(result);
  return res;
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});