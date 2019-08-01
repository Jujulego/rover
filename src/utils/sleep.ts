// Utils
async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export default sleep;