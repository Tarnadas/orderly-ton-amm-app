import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from 'ton-core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type Mint = {
  $$type: 'Mint';
  amount: bigint;
  receiver: Address;
  responseDestination: Address;
};

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2430155087, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.receiver);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2430155087) {
    throw Error('Invalid prefix');
  }
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  let _responseDestination = sc_0.loadAddress();
  return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver, responseDestination: _responseDestination };
}

function loadTupleMint(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  let _responseDestination = source.readAddress();
  return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver, responseDestination: _responseDestination };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMint(src)).endCell());
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse());
    },
  };
}

export type JettonData = {
  $$type: 'JettonData';
  totalSupply: bigint;
  mintable: boolean;
  owner: Address;
  content: Cell;
  walletCode: Cell;
};

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.totalSupply, 257);
    b_0.storeBit(src.mintable);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.content);
    b_0.storeRef(src.walletCode);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _totalSupply = sc_0.loadIntBig(257);
  let _mintable = sc_0.loadBit();
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  let _walletCode = sc_0.loadRef();
  return {
    $$type: 'JettonData' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    walletCode: _walletCode,
  };
}

function loadTupleJettonData(source: TupleReader) {
  let _totalSupply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _owner = source.readAddress();
  let _content = source.readCell();
  let _walletCode = source.readCell();
  return {
    $$type: 'JettonData' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    walletCode: _walletCode,
  };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.totalSupply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
    },
    parse: (src) => {
      return loadJettonData(src.loadRef().beginParse());
    },
  };
}

export type JettonWalletData = {
  $$type: 'JettonWalletData';
  balance: bigint;
  owner: Address;
  master: Address;
  walletCode: Cell;
};

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.balance, 257);
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.master);
    b_0.storeRef(src.walletCode);
  };
}

export function loadJettonWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _master = sc_0.loadAddress();
  let _walletCode = sc_0.loadRef();
  return {
    $$type: 'JettonWalletData' as const,
    balance: _balance,
    owner: _owner,
    master: _master,
    walletCode: _walletCode,
  };
}

function loadTupleJettonWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _master = source.readAddress();
  let _walletCode = source.readCell();
  return {
    $$type: 'JettonWalletData' as const,
    balance: _balance,
    owner: _owner,
    master: _master,
    walletCode: _walletCode,
  };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.master);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
    },
    parse: (src) => {
      return loadJettonWalletData(src.loadRef().beginParse());
    },
  };
}

export type TokenTransfer = {
  $$type: 'TokenTransfer';
  queryId: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'TokenTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: 'TokenTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTokenTransfer(src.loadRef().beginParse());
    },
  };
}

export type TokenTransferInternal = {
  $$type: 'TokenTransferInternal';
  queryId: bigint;
  amount: bigint;
  from: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeTokenTransferInternal(src: TokenTransferInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(395134233, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.response_destination);
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'TokenTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    from: _from,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_destination = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: 'TokenTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    from: _from,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
    },
    parse: (src) => {
      return loadTokenTransferInternal(src.loadRef().beginParse());
    },
  };
}

export type TokenNotification = {
  $$type: 'TokenNotification';
  queryId: bigint;
  amount: bigint;
  from: Address;
  forward_payload: Cell;
};

export function storeTokenNotification(src: TokenNotification) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1935855772, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'TokenNotification' as const,
    queryId: _queryId,
    amount: _amount,
    from: _from,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: 'TokenNotification' as const,
    queryId: _queryId,
    amount: _amount,
    from: _from,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenNotification(source: TokenNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
    },
    parse: (src) => {
      return loadTokenNotification(src.loadRef().beginParse());
    },
  };
}

export type TokenBurn = {
  $$type: 'TokenBurn';
  queryId: bigint;
  amount: bigint;
  response_destination: Address;
  custom_payload: Cell | null;
};

export function storeTokenBurn(src: TokenBurn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1499400124, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadTokenBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'TokenBurn' as const,
    queryId: _queryId,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function loadTupleTokenBurn(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  return {
    $$type: 'TokenBurn' as const,
    queryId: _queryId,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function storeTupleTokenBurn(source: TokenBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
    },
    parse: (src) => {
      return loadTokenBurn(src.loadRef().beginParse());
    },
  };
}

export type TokenBurnNotification = {
  $$type: 'TokenBurnNotification';
  queryId: bigint;
  amount: bigint;
  response_destination: Address;
};

export function storeTokenBurnNotification(src: TokenBurnNotification) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2078119902, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  return {
    $$type: 'TokenBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    response_destination: _response_destination,
  };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  return {
    $$type: 'TokenBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    response_destination: _response_destination,
  };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
    },
    parse: (src) => {
      return loadTokenBurnNotification(src.loadRef().beginParse());
    },
  };
}

export type TokenExcesses = {
  $$type: 'TokenExcesses';
  queryId: bigint;
};

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadTokenExcesses(src.loadRef().beginParse());
    },
  };
}

export type TokenUpdateContent = {
  $$type: 'TokenUpdateContent';
  content: Cell;
};

export function storeTokenUpdateContent(src: TokenUpdateContent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2937889386, 32);
    b_0.storeRef(src.content);
  };
}

export function loadTokenUpdateContent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2937889386) {
    throw Error('Invalid prefix');
  }
  let _content = sc_0.loadRef();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
  let _content = source.readCell();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
  let builder = new TupleBuilder();
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
    },
    parse: (src) => {
      return loadTokenUpdateContent(src.loadRef().beginParse());
    },
  };
}

export type OrderlyDepositData = {
  $$type: 'OrderlyDepositData';
  balance: bigint;
  master: Address;
  owner: Address;
  jetton_wallet: Address;
  walletCode: Cell;
};

export function storeOrderlyDepositData(src: OrderlyDepositData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.balance, 257);
    b_0.storeAddress(src.master);
    b_0.storeAddress(src.owner);
    let b_1 = new Builder();
    b_1.storeAddress(src.jetton_wallet);
    b_1.storeRef(src.walletCode);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadOrderlyDepositData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _master = sc_0.loadAddress();
  let _owner = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _jetton_wallet = sc_1.loadAddress();
  let _walletCode = sc_1.loadRef();
  return {
    $$type: 'OrderlyDepositData' as const,
    balance: _balance,
    master: _master,
    owner: _owner,
    jetton_wallet: _jetton_wallet,
    walletCode: _walletCode,
  };
}

function loadTupleOrderlyDepositData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _master = source.readAddress();
  let _owner = source.readAddress();
  let _jetton_wallet = source.readAddress();
  let _walletCode = source.readCell();
  return {
    $$type: 'OrderlyDepositData' as const,
    balance: _balance,
    master: _master,
    owner: _owner,
    jetton_wallet: _jetton_wallet,
    walletCode: _walletCode,
  };
}

function storeTupleOrderlyDepositData(source: OrderlyDepositData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.master);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.jetton_wallet);
  builder.writeCell(source.walletCode);
  return builder.build();
}

function dictValueParserOrderlyDepositData(): DictionaryValue<OrderlyDepositData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeOrderlyDepositData(src)).endCell());
    },
    parse: (src) => {
      return loadOrderlyDepositData(src.loadRef().beginParse());
    },
  };
}

export type DepositInternal = {
  $$type: 'DepositInternal';
  queryId: bigint;
  amount: bigint;
  responseDestination: Address;
};

export function storeDepositInternal(src: DepositInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(305419896, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadDepositInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 305419896) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _responseDestination = sc_0.loadAddress();
  return {
    $$type: 'DepositInternal' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
  };
}

function loadTupleDepositInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _responseDestination = source.readAddress();
  return {
    $$type: 'DepositInternal' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
  };
}

function storeTupleDepositInternal(source: DepositInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserDepositInternal(): DictionaryValue<DepositInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDepositInternal(src)).endCell());
    },
    parse: (src) => {
      return loadDepositInternal(src.loadRef().beginParse());
    },
  };
}

export type Withdraw = {
  $$type: 'Withdraw';
  queryId: bigint;
  amount: bigint;
};

export function storeWithdraw(src: Withdraw) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2585211658, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
  };
}

export function loadWithdraw(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2585211658) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  return { $$type: 'Withdraw' as const, queryId: _queryId, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'Withdraw' as const, queryId: _queryId, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
    },
    parse: (src) => {
      return loadWithdraw(src.loadRef().beginParse());
    },
  };
}

export type WithdrawAll = {
  $$type: 'WithdrawAll';
  queryId: bigint;
};

export function storeWithdrawAll(src: WithdrawAll) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1450671399, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadWithdrawAll(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1450671399) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'WithdrawAll' as const, queryId: _queryId };
}

function loadTupleWithdrawAll(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'WithdrawAll' as const, queryId: _queryId };
}

function storeTupleWithdrawAll(source: WithdrawAll) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserWithdrawAll(): DictionaryValue<WithdrawAll> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWithdrawAll(src)).endCell());
    },
    parse: (src) => {
      return loadWithdrawAll(src.loadRef().beginParse());
    },
  };
}

export type WithdrawInternal = {
  $$type: 'WithdrawInternal';
  queryId: bigint;
  amount: bigint;
  destination: Address;
  jetton_wallet: Address;
  responseDestination: Address;
};

export function storeWithdrawInternal(src: WithdrawInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2445898473, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.jetton_wallet);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadWithdrawInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2445898473) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _jetton_wallet = sc_0.loadAddress();
  let _responseDestination = sc_0.loadAddress();
  return {
    $$type: 'WithdrawInternal' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    jetton_wallet: _jetton_wallet,
    responseDestination: _responseDestination,
  };
}

function loadTupleWithdrawInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _jetton_wallet = source.readAddress();
  let _responseDestination = source.readAddress();
  return {
    $$type: 'WithdrawInternal' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    jetton_wallet: _jetton_wallet,
    responseDestination: _responseDestination,
  };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.jetton_wallet);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserWithdrawInternal(): DictionaryValue<WithdrawInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWithdrawInternal(src)).endCell());
    },
    parse: (src) => {
      return loadWithdrawInternal(src.loadRef().beginParse());
    },
  };
}

export type Swap = {
  $$type: 'Swap';
  lpAddress: Address;
  side: boolean;
  minOut: bigint;
};

export function storeSwap(src: Swap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3861073849, 32);
    b_0.storeAddress(src.lpAddress);
    b_0.storeBit(src.side);
    b_0.storeCoins(src.minOut);
  };
}

export function loadSwap(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3861073849) {
    throw Error('Invalid prefix');
  }
  let _lpAddress = sc_0.loadAddress();
  let _side = sc_0.loadBit();
  let _minOut = sc_0.loadCoins();
  return { $$type: 'Swap' as const, lpAddress: _lpAddress, side: _side, minOut: _minOut };
}

function loadTupleSwap(source: TupleReader) {
  let _lpAddress = source.readAddress();
  let _side = source.readBoolean();
  let _minOut = source.readBigNumber();
  return { $$type: 'Swap' as const, lpAddress: _lpAddress, side: _side, minOut: _minOut };
}

function storeTupleSwap(source: Swap) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.lpAddress);
  builder.writeBoolean(source.side);
  builder.writeNumber(source.minOut);
  return builder.build();
}

function dictValueParserSwap(): DictionaryValue<Swap> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSwap(src)).endCell());
    },
    parse: (src) => {
      return loadSwap(src.loadRef().beginParse());
    },
  };
}

export type SwapInternal = {
  $$type: 'SwapInternal';
  amount: bigint;
  lpAddress: Address;
  side: boolean;
  minOut: bigint;
};

export function storeSwapInternal(src: SwapInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3712832002, 32);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.lpAddress);
    b_0.storeBit(src.side);
    b_0.storeCoins(src.minOut);
  };
}

export function loadSwapInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3712832002) {
    throw Error('Invalid prefix');
  }
  let _amount = sc_0.loadCoins();
  let _lpAddress = sc_0.loadAddress();
  let _side = sc_0.loadBit();
  let _minOut = sc_0.loadCoins();
  return { $$type: 'SwapInternal' as const, amount: _amount, lpAddress: _lpAddress, side: _side, minOut: _minOut };
}

function loadTupleSwapInternal(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _lpAddress = source.readAddress();
  let _side = source.readBoolean();
  let _minOut = source.readBigNumber();
  return { $$type: 'SwapInternal' as const, amount: _amount, lpAddress: _lpAddress, side: _side, minOut: _minOut };
}

function storeTupleSwapInternal(source: SwapInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.lpAddress);
  builder.writeBoolean(source.side);
  builder.writeNumber(source.minOut);
  return builder.build();
}

function dictValueParserSwapInternal(): DictionaryValue<SwapInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSwapInternal(src)).endCell());
    },
    parse: (src) => {
      return loadSwapInternal(src.loadRef().beginParse());
    },
  };
}

export type SwapLpInternal = {
  $$type: 'SwapLpInternal';
  amount: bigint;
  side: boolean;
  minOut: bigint;
  from: Address;
  jettonWallet: Address;
};

export function storeSwapLpInternal(src: SwapLpInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(976765715, 32);
    b_0.storeCoins(src.amount);
    b_0.storeBit(src.side);
    b_0.storeCoins(src.minOut);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.jettonWallet);
  };
}

export function loadSwapLpInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 976765715) {
    throw Error('Invalid prefix');
  }
  let _amount = sc_0.loadCoins();
  let _side = sc_0.loadBit();
  let _minOut = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _jettonWallet = sc_0.loadAddress();
  return {
    $$type: 'SwapLpInternal' as const,
    amount: _amount,
    side: _side,
    minOut: _minOut,
    from: _from,
    jettonWallet: _jettonWallet,
  };
}

function loadTupleSwapLpInternal(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _side = source.readBoolean();
  let _minOut = source.readBigNumber();
  let _from = source.readAddress();
  let _jettonWallet = source.readAddress();
  return {
    $$type: 'SwapLpInternal' as const,
    amount: _amount,
    side: _side,
    minOut: _minOut,
    from: _from,
    jettonWallet: _jettonWallet,
  };
}

function storeTupleSwapLpInternal(source: SwapLpInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeBoolean(source.side);
  builder.writeNumber(source.minOut);
  builder.writeAddress(source.from);
  builder.writeAddress(source.jettonWallet);
  return builder.build();
}

function dictValueParserSwapLpInternal(): DictionaryValue<SwapLpInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSwapLpInternal(src)).endCell());
    },
    parse: (src) => {
      return loadSwapLpInternal(src.loadRef().beginParse());
    },
  };
}

export type CreateLp = {
  $$type: 'CreateLp';
  base: Address;
  quote: Address;
};

export function storeCreateLp(src: CreateLp) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3152499195, 32);
    b_0.storeAddress(src.base);
    b_0.storeAddress(src.quote);
  };
}

export function loadCreateLp(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3152499195) {
    throw Error('Invalid prefix');
  }
  let _base = sc_0.loadAddress();
  let _quote = sc_0.loadAddress();
  return { $$type: 'CreateLp' as const, base: _base, quote: _quote };
}

function loadTupleCreateLp(source: TupleReader) {
  let _base = source.readAddress();
  let _quote = source.readAddress();
  return { $$type: 'CreateLp' as const, base: _base, quote: _quote };
}

function storeTupleCreateLp(source: CreateLp) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.base);
  builder.writeAddress(source.quote);
  return builder.build();
}

function dictValueParserCreateLp(): DictionaryValue<CreateLp> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCreateLp(src)).endCell());
    },
    parse: (src) => {
      return loadCreateLp(src.loadRef().beginParse());
    },
  };
}

export type CreateLpInternal = {
  $$type: 'CreateLpInternal';
  responseDestination: Address;
};

export function storeCreateLpInternal(src: CreateLpInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4022361044, 32);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadCreateLpInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4022361044) {
    throw Error('Invalid prefix');
  }
  let _responseDestination = sc_0.loadAddress();
  return { $$type: 'CreateLpInternal' as const, responseDestination: _responseDestination };
}

function loadTupleCreateLpInternal(source: TupleReader) {
  let _responseDestination = source.readAddress();
  return { $$type: 'CreateLpInternal' as const, responseDestination: _responseDestination };
}

function storeTupleCreateLpInternal(source: CreateLpInternal) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserCreateLpInternal(): DictionaryValue<CreateLpInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCreateLpInternal(src)).endCell());
    },
    parse: (src) => {
      return loadCreateLpInternal(src.loadRef().beginParse());
    },
  };
}

export type CreateLpSuccessInternal = {
  $$type: 'CreateLpSuccessInternal';
  base: Address;
  quote: Address;
  responseDestination: Address;
};

export function storeCreateLpSuccessInternal(src: CreateLpSuccessInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2468653919, 32);
    b_0.storeAddress(src.base);
    b_0.storeAddress(src.quote);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadCreateLpSuccessInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2468653919) {
    throw Error('Invalid prefix');
  }
  let _base = sc_0.loadAddress();
  let _quote = sc_0.loadAddress();
  let _responseDestination = sc_0.loadAddress();
  return {
    $$type: 'CreateLpSuccessInternal' as const,
    base: _base,
    quote: _quote,
    responseDestination: _responseDestination,
  };
}

function loadTupleCreateLpSuccessInternal(source: TupleReader) {
  let _base = source.readAddress();
  let _quote = source.readAddress();
  let _responseDestination = source.readAddress();
  return {
    $$type: 'CreateLpSuccessInternal' as const,
    base: _base,
    quote: _quote,
    responseDestination: _responseDestination,
  };
}

function storeTupleCreateLpSuccessInternal(source: CreateLpSuccessInternal) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.base);
  builder.writeAddress(source.quote);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserCreateLpSuccessInternal(): DictionaryValue<CreateLpSuccessInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCreateLpSuccessInternal(src)).endCell());
    },
    parse: (src) => {
      return loadCreateLpSuccessInternal(src.loadRef().beginParse());
    },
  };
}

export type LiquidityPool = {
  $$type: 'LiquidityPool';
  base: Address;
  quote: Address;
};

export function storeLiquidityPool(src: LiquidityPool) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(361786553, 32);
    b_0.storeAddress(src.base);
    b_0.storeAddress(src.quote);
  };
}

export function loadLiquidityPool(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 361786553) {
    throw Error('Invalid prefix');
  }
  let _base = sc_0.loadAddress();
  let _quote = sc_0.loadAddress();
  return { $$type: 'LiquidityPool' as const, base: _base, quote: _quote };
}

function loadTupleLiquidityPool(source: TupleReader) {
  let _base = source.readAddress();
  let _quote = source.readAddress();
  return { $$type: 'LiquidityPool' as const, base: _base, quote: _quote };
}

function storeTupleLiquidityPool(source: LiquidityPool) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.base);
  builder.writeAddress(source.quote);
  return builder.build();
}

function dictValueParserLiquidityPool(): DictionaryValue<LiquidityPool> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeLiquidityPool(src)).endCell());
    },
    parse: (src) => {
      return loadLiquidityPool(src.loadRef().beginParse());
    },
  };
}

export type AddLiquidity = {
  $$type: 'AddLiquidity';
  base: Address;
  baseAmount: bigint;
  baseWallet: Address;
  quote: Address;
  quoteAmount: bigint;
  quoteWallet: Address;
};

export function storeAddLiquidity(src: AddLiquidity) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2275276346, 32);
    b_0.storeAddress(src.base);
    b_0.storeCoins(src.baseAmount);
    b_0.storeAddress(src.baseWallet);
    b_0.storeAddress(src.quote);
    let b_1 = new Builder();
    b_1.storeCoins(src.quoteAmount);
    b_1.storeAddress(src.quoteWallet);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadAddLiquidity(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2275276346) {
    throw Error('Invalid prefix');
  }
  let _base = sc_0.loadAddress();
  let _baseAmount = sc_0.loadCoins();
  let _baseWallet = sc_0.loadAddress();
  let _quote = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _quoteAmount = sc_1.loadCoins();
  let _quoteWallet = sc_1.loadAddress();
  return {
    $$type: 'AddLiquidity' as const,
    base: _base,
    baseAmount: _baseAmount,
    baseWallet: _baseWallet,
    quote: _quote,
    quoteAmount: _quoteAmount,
    quoteWallet: _quoteWallet,
  };
}

function loadTupleAddLiquidity(source: TupleReader) {
  let _base = source.readAddress();
  let _baseAmount = source.readBigNumber();
  let _baseWallet = source.readAddress();
  let _quote = source.readAddress();
  let _quoteAmount = source.readBigNumber();
  let _quoteWallet = source.readAddress();
  return {
    $$type: 'AddLiquidity' as const,
    base: _base,
    baseAmount: _baseAmount,
    baseWallet: _baseWallet,
    quote: _quote,
    quoteAmount: _quoteAmount,
    quoteWallet: _quoteWallet,
  };
}

function storeTupleAddLiquidity(source: AddLiquidity) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.base);
  builder.writeNumber(source.baseAmount);
  builder.writeAddress(source.baseWallet);
  builder.writeAddress(source.quote);
  builder.writeNumber(source.quoteAmount);
  builder.writeAddress(source.quoteWallet);
  return builder.build();
}

function dictValueParserAddLiquidity(): DictionaryValue<AddLiquidity> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddLiquidity(src)).endCell());
    },
    parse: (src) => {
      return loadAddLiquidity(src.loadRef().beginParse());
    },
  };
}

export type AddLiquidityInternal = {
  $$type: 'AddLiquidityInternal';
  queryId: bigint;
  amount: bigint;
  lpAddress: Address;
  isBase: boolean;
  responseDestination: Address;
};

export function storeAddLiquidityInternal(src: AddLiquidityInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4264500838, 32);
    b_0.storeInt(src.queryId, 257);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.lpAddress);
    b_0.storeBit(src.isBase);
    b_0.storeAddress(src.responseDestination);
  };
}

export function loadAddLiquidityInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4264500838) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadIntBig(257);
  let _amount = sc_0.loadCoins();
  let _lpAddress = sc_0.loadAddress();
  let _isBase = sc_0.loadBit();
  let _responseDestination = sc_0.loadAddress();
  return {
    $$type: 'AddLiquidityInternal' as const,
    queryId: _queryId,
    amount: _amount,
    lpAddress: _lpAddress,
    isBase: _isBase,
    responseDestination: _responseDestination,
  };
}

function loadTupleAddLiquidityInternal(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _lpAddress = source.readAddress();
  let _isBase = source.readBoolean();
  let _responseDestination = source.readAddress();
  return {
    $$type: 'AddLiquidityInternal' as const,
    queryId: _queryId,
    amount: _amount,
    lpAddress: _lpAddress,
    isBase: _isBase,
    responseDestination: _responseDestination,
  };
}

function storeTupleAddLiquidityInternal(source: AddLiquidityInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.lpAddress);
  builder.writeBoolean(source.isBase);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserAddLiquidityInternal(): DictionaryValue<AddLiquidityInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddLiquidityInternal(src)).endCell());
    },
    parse: (src) => {
      return loadAddLiquidityInternal(src.loadRef().beginParse());
    },
  };
}

export type SendLiquidityToLpInternal = {
  $$type: 'SendLiquidityToLpInternal';
  amount: bigint;
  queryId: bigint;
  from: Address;
  jettonWallet: Address;
  isBase: boolean;
  responseDestination: Address;
};

export function storeSendLiquidityToLpInternal(src: SendLiquidityToLpInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4078701601, 32);
    b_0.storeCoins(src.amount);
    b_0.storeInt(src.queryId, 257);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.jettonWallet);
    b_0.storeBit(src.isBase);
    let b_1 = new Builder();
    b_1.storeAddress(src.responseDestination);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadSendLiquidityToLpInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4078701601) {
    throw Error('Invalid prefix');
  }
  let _amount = sc_0.loadCoins();
  let _queryId = sc_0.loadIntBig(257);
  let _from = sc_0.loadAddress();
  let _jettonWallet = sc_0.loadAddress();
  let _isBase = sc_0.loadBit();
  let sc_1 = sc_0.loadRef().beginParse();
  let _responseDestination = sc_1.loadAddress();
  return {
    $$type: 'SendLiquidityToLpInternal' as const,
    amount: _amount,
    queryId: _queryId,
    from: _from,
    jettonWallet: _jettonWallet,
    isBase: _isBase,
    responseDestination: _responseDestination,
  };
}

function loadTupleSendLiquidityToLpInternal(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _queryId = source.readBigNumber();
  let _from = source.readAddress();
  let _jettonWallet = source.readAddress();
  let _isBase = source.readBoolean();
  let _responseDestination = source.readAddress();
  return {
    $$type: 'SendLiquidityToLpInternal' as const,
    amount: _amount,
    queryId: _queryId,
    from: _from,
    jettonWallet: _jettonWallet,
    isBase: _isBase,
    responseDestination: _responseDestination,
  };
}

function storeTupleSendLiquidityToLpInternal(source: SendLiquidityToLpInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.from);
  builder.writeAddress(source.jettonWallet);
  builder.writeBoolean(source.isBase);
  builder.writeAddress(source.responseDestination);
  return builder.build();
}

function dictValueParserSendLiquidityToLpInternal(): DictionaryValue<SendLiquidityToLpInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendLiquidityToLpInternal(src)).endCell());
    },
    parse: (src) => {
      return loadSendLiquidityToLpInternal(src.loadRef().beginParse());
    },
  };
}

export type PendingQuery = {
  $$type: 'PendingQuery';
  amount: bigint;
  isBase: boolean;
};

export function storePendingQuery(src: PendingQuery) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.amount);
    b_0.storeBit(src.isBase);
  };
}

export function loadPendingQuery(slice: Slice) {
  let sc_0 = slice;
  let _amount = sc_0.loadCoins();
  let _isBase = sc_0.loadBit();
  return { $$type: 'PendingQuery' as const, amount: _amount, isBase: _isBase };
}

function loadTuplePendingQuery(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _isBase = source.readBoolean();
  return { $$type: 'PendingQuery' as const, amount: _amount, isBase: _isBase };
}

function storeTuplePendingQuery(source: PendingQuery) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeBoolean(source.isBase);
  return builder.build();
}

function dictValueParserPendingQuery(): DictionaryValue<PendingQuery> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storePendingQuery(src)).endCell());
    },
    parse: (src) => {
      return loadPendingQuery(src.loadRef().beginParse());
    },
  };
}

type JettonWallet_init_args = {
  $$type: 'JettonWallet_init_args';
  master: Address;
  owner: Address;
};

function initJettonWallet_init_args(src: JettonWallet_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.master);
    b_0.storeAddress(src.owner);
  };
}

async function JettonWallet_init(master: Address, owner: Address) {
  const __code = Cell.fromBase64(
    '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',
  );
  const __system = Cell.fromBase64(
    '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',
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initJettonWallet_init_args({ $$type: 'JettonWallet_init_args', master, owner })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const JettonWallet_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4429: { message: `Invalid sender` },
  23951: { message: `Insufficient gas` },
  43422: { message: `Invalid value - Burn` },
  62972: { message: `Invalid balance` },
};

const JettonWallet_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      { name: 'bounced', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'Deploy',
    header: 2490013878,
    fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'cashback', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'Mint',
    header: 2430155087,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'JettonData',
    header: null,
    fields: [
      { name: 'totalSupply', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'mintable', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'walletCode', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'JettonWalletData',
    header: null,
    fields: [
      { name: 'balance', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'master', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'walletCode', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'TokenTransfer',
    header: 260734629,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'custom_payload', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'forward_ton_amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'forward_payload', type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' } },
    ],
  },
  {
    name: 'TokenTransferInternal',
    header: 395134233,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'from', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'forward_ton_amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'forward_payload', type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' } },
    ],
  },
  {
    name: 'TokenNotification',
    header: 1935855772,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'from', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'forward_payload', type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' } },
    ],
  },
  {
    name: 'TokenBurn',
    header: 1499400124,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'custom_payload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'TokenBurnNotification',
    header: 2078119902,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'response_destination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'TokenExcesses',
    header: 3576854235,
    fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
  },
  {
    name: 'TokenUpdateContent',
    header: 2937889386,
    fields: [{ name: 'content', type: { kind: 'simple', type: 'cell', optional: false } }],
  },
  {
    name: 'OrderlyDepositData',
    header: null,
    fields: [
      { name: 'balance', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'master', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jetton_wallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'walletCode', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'DepositInternal',
    header: 305419896,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'Withdraw',
    header: 2585211658,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
    ],
  },
  {
    name: 'WithdrawAll',
    header: 1450671399,
    fields: [{ name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } }],
  },
  {
    name: 'WithdrawInternal',
    header: 2445898473,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jetton_wallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'Swap',
    header: 3861073849,
    fields: [
      { name: 'lpAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'side', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'minOut', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
    ],
  },
  {
    name: 'SwapInternal',
    header: 3712832002,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'lpAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'side', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'minOut', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
    ],
  },
  {
    name: 'SwapLpInternal',
    header: 976765715,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'side', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'minOut', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'from', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jettonWallet', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'CreateLp',
    header: 3152499195,
    fields: [
      { name: 'base', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'quote', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'CreateLpInternal',
    header: 4022361044,
    fields: [{ name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } }],
  },
  {
    name: 'CreateLpSuccessInternal',
    header: 2468653919,
    fields: [
      { name: 'base', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'quote', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'LiquidityPool',
    header: 361786553,
    fields: [
      { name: 'base', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'quote', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'AddLiquidity',
    header: 2275276346,
    fields: [
      { name: 'base', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'baseAmount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'baseWallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'quote', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'quoteAmount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'quoteWallet', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'AddLiquidityInternal',
    header: 4264500838,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'lpAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'isBase', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'SendLiquidityToLpInternal',
    header: 4078701601,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'queryId', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'from', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jettonWallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'isBase', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'PendingQuery',
    header: null,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'isBase', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
];

const JettonWallet_getters: ABIGetter[] = [
  {
    name: 'msgValue',
    arguments: [{ name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } }],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  { name: 'get_wallet_data', arguments: [], returnType: { kind: 'simple', type: 'JettonWalletData', optional: false } },
];

const JettonWallet_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'TokenTransfer' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'TokenTransferInternal' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'TokenBurn' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
];

export class JettonWallet implements Contract {
  static async init(master: Address, owner: Address) {
    return await JettonWallet_init(master, owner);
  }

  static async fromInit(master: Address, owner: Address) {
    const init = await JettonWallet_init(master, owner);
    const address = contractAddress(0, init);
    return new JettonWallet(address, init);
  }

  static fromAddress(address: Address) {
    return new JettonWallet(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: JettonWallet_types,
    getters: JettonWallet_getters,
    receivers: JettonWallet_receivers,
    errors: JettonWallet_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: TokenTransfer | TokenTransferInternal | TokenBurn | Deploy,
  ) {
    let body: Cell | null = null;
    if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenTransfer') {
      body = beginCell().store(storeTokenTransfer(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'TokenTransferInternal'
    ) {
      body = beginCell().store(storeTokenTransferInternal(message)).endCell();
    }
    if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurn') {
      body = beginCell().store(storeTokenBurn(message)).endCell();
    }
    if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getMsgValue(provider: ContractProvider, value: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(value);
    let source = (await provider.get('msgValue', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getGetWalletData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('get_wallet_data', builder.build())).stack;
    const result = loadTupleJettonWalletData(source);
    return result;
  }
}
