export const handler = async (event: any) => {
  console.log('Notificaton lambda called!')
  return { statusCode: 200, body: JSON.stringify({ ok: true, event }) }
}
