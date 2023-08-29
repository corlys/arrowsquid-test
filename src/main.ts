import { TypeormDatabase } from '@subsquid/typeorm-store'
import { Burn } from './model'
import { processor } from './processor'
import * as erc721Abi from './abi/erc721'

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  for (let c of ctx.blocks) {
    for (let log of c.logs) {
      // decode and normalize the tx data
      if (log.topics[0] == erc721Abi.events.Transfer.topic) {
        const decodedLog = erc721Abi.events.Transfer.decode(log)
        ctx.log.info(JSON.stringify({ from: decodedLog.from, to: decodedLog.to, tokenId: decodedLog.tokenId.toString() }))
      }
    }
  }
  // apply vectorized transformations and aggregations

  // upsert batches of entities with batch-optimized ctx.store.save
})
