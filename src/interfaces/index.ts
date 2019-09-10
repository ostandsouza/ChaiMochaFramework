//import { CoralComboBoxItem } from "redi-react-element-library";

export interface ApiKey {
  serverKey: string;
  keyPair: KeyPair;
}

export interface Login {
  key: string;
  loggedIn: boolean;
}

export interface KeyPair {
  privateKey: string | "";
  publicKey: string | "";
}
export interface Params {
  jData: string;
  jKey: string;
}

export interface FormState {
  selectedExchange: string;
  selectedOrderType: string;
  selectedProCli: string;
  selectedInstrumentName: string;
  selectedSymbol: string;
  selectedOptionType: string;
  selectedStrikePrice: string;
  selectedExpiryDate: string;
  enteredQuantity: string;
  enteredPrice: string;
  enteredDiscQty: string;
  selectedValidity: string;
  enteredRemarks: string;
  selectedSide: string;
  selectedToken: string;
  boardLot: string;
  tickSize: string;
  isTrailingStopLoss: boolean;
  squareOffLtpAtp: LTPATP;
  squareOffAbsoluteTicks: ABSOLUTE_TICKS;
  squareOffAbsoluteTicksValue: string;
  stopLossLtpAtp: LTPATP;
  stopLossAbsoluteTicks: ABSOLUTE_TICKS;
  stopLossAbsoluteTicksValue: string;
  trailingTicksValue: string;
}

export enum LTPATP {
  LTP = "LTP",
  ATP = "ATP"
}

export enum ABSOLUTE_TICKS {
  ABSOLUTE = "ABSOLUTE",
  TICKS = "TICKS"
}
export interface Order {
  Prc: string;
  RequestID: string;
  Cancelqty: number;
  discQtyPerc: string;
  Mktpro: string;
  defmktproval: string;
  optionType: string;
  usecs: string;
  mpro: string;
  Qty: number;
  ordergenerationtype: string;
  Unfilledsize: number;
  Usercomments: string;
  ticksize: string;
  Prctype: string;
  Status: string;
  Minqty: number;
  Exseg: string;
  Sym: string;
  multiplier: string;
  ExchOrdID: string;
  ExchConfrmtime: string;
  Pcode: string;
  SyomOrderId: string;
  Dscqty: number;
  Exchange: string;
  Ordvaldate: string;
  accountId: string;
  Avgprc: string;
  Trgprc: string;
  Trantype: string;
  bqty: string;
  Trsym: string;
  Fillshares: number;
  AlgoCategory: string;
  sipindicator: string;
  strikePrice: string;
  reporttype: string;
  AlgoID: string;
  noMktPro: string;
  BrokerClient: string;
  decprec: string;
  ExpDate: string;
  COPercentage: number;
  marketprotectionpercentage: string;
  Nstordno: string;
  ExpSsbDate: string;
  OrderedTime: string;
  RejReason: string;
  modifiedBy: string;
  Scripname: string;
  stat: string;
  orderentrytime: string;
  PriceDenomenator: string;
  panNo: string;
  RefLmtPrice: number;
  PriceNumerator: string;
  token: string;
  ordersource: string;
  Validity: string;
  GeneralDenomenator: string;
  series: string;
  InstName: string;
  GeneralNumerator: string;
  user: string;
  remarks: string;
  iSinceBOE: number;
}

export interface MongoApi {
  api: string;
  execute: boolean;
}

export interface LoginApi {
  uid: string;
  actid: string;
  Lcount: number;
}

export interface PwdApi {
  uid: string;
  pwd: string;
  Source: string;
  Imei: string;
  apk: string;
  ftl: string;
}

export interface AnsApi {
  uid: string;
  Count: string;
  as: string;
  is: string;
}

export interface MWApi {
  uid: string;
  Mwname: string;
}

export interface RetentionApi{
  Exchange: string;
}

export interface PlaceOrderApi{
  s_prdt_ali: string;
  uid : string;
  actid: string;
  Tsym : string;
  exch: string;
  Ttranstype : string;
  Ret: string;
  prctyp : string;
  qty: string;
  discqty : string;
  MktPro: string;
  Price : string;
  TrigPrice: string;
  Pcode : string;
  DateDays: string;
  AMO : string;
  PosSquareFlg: string;
}

export interface PositionBookApi {
  uid: string;
  actid: string;
  type: string;
  s_prdt_ali: string;
}

export interface LimitsApi {
  uid: string;
  actid: string;
  segment: string;
}

export interface InitKey {
  stat: string;
  publicKey: string;
  tomcatCount: string;
  error : string;
}

export interface AuthKey {
  stat: string;
  publicKey3: string;
  error : string;
}

export interface LogKey {
  stat: string;
  imgsrc: string;
  Emsg : string;
}

export interface PwdKey {
  stat: string;
  tdata: string;
  scount : string;
  ResetFlag: string;
  sQuestions: string;
  sIndex : string;
  PwdRegex: string;
  loginid: string;
  Emsg : string;
}

export interface AnsKey {
  stat: string;
  tdata: string;
  Message : string;
  sLastAccessInSec: string;
  sPasswordReset: string;
  sUserToken : string;
  UserSessionID: string;
  Loginid: string;
  loginMessage : string;
  tomcatCount : string;
  userCompliant: string;
  userCompliantURL: string;
  Emsg: string;
}

export interface DefaultKey {
  stat: string;
  exarr: string;
  orarr : string;
  prarr: string;
  s_prdt_ali: string;
  sTransFlg : string;
  dmw: string;
  brkname: string;
  brnchid : string;
  MaxMWCount : string;
  email: string;
  Weblink: string;
  sAccountId: string;
  exchDeatil: string;
  ltwtEnable: string;
  pwdSplChar : string;
  accountName : string;
  userPrivileges: string;
  YSXorderEntry: string;
  criteriaAttribute: string;
  Emsg: string;
}