import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor'

import * as erc721Abi from "./abi/erc721"

export const processor = new EvmBatchProcessor()
  .setDataSource({
    // Change the Archive endpoints for run the squid
    // against the other EVM networks
    // For a full list of supported networks and config options
    // see https://docs.subsquid.io/evm-indexing/
    archive: "https://v2.archive.subsquid.io/network/astar-mainnet",

    // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
    // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
    chain: process.env.RPC_ASTAR_PRIVATE || "https://astar.blastapi.io/0b94d437-3ec1-4535-996b-8ead8d02f5bf",
  })
  .setFinalityConfirmation(75)
  .addLog({
    address: ['0x8b5d62f396Ca3C6cF19803234685e693733f9779'.toLowerCase()],
    topic0: [
      erc721Abi.events.Transfer.topic
    ]
  })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
