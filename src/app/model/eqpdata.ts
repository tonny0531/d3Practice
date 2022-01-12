//#region DTO

export class BasicInfo {
  EventName?: string;
  ExpandData?: any;
  TimeStamp?: any;
  Version?: string;
  EventSource?: string;
}

export class EQPInfo extends BasicInfo {
  EQPMainInfo?: EQPSMainInfo = new EQPSMainInfo();
  EQPMesInfo?: EQPMesInfo = new EQPMesInfo();
  EQPControlInfo?: EQPControlInfo = new EQPControlInfo();
  EQPCommunicationInfo?: EQPCommunicationInfo = new EQPCommunicationInfo();
  EQPTerminalInfo? = new EQPTerminalInfo();
  EQPUnitInfos?: EQPUnitInfo[] = [];
  CassetteInfo?: CassetteInfo;
  WaferProcessInfo?: WaferProcessInfo;
  DurableInfos?: DurableInfo[] = [];
  RecipeInfos?: RecipeInfo[] = [];
  AlarmInfo?: AlarmInfo = new AlarmInfo();
  MonitorInfo?: MonitorInfo = new MonitorInfo();
  MergeStatus?: string;
}

export class EQPSMainInfo extends BasicInfo {
  EQPId?: string;
  EQPType?: string;
  EQPStatus?: string;
  EQPStatusTime?: any;
  PrevEQPStatus?: string;
  PrevEQPStatusTime?: any;
}

export class EQPMesInfo extends BasicInfo {
  EQPId?: string;
  EQPType?: string;
  EQPStatus?: string;
  StatusDescription?: string;
  EQPStatusTime?: any;
  PrevEQPStatus?: string;
  PrevEQPStatusTime?: any;
}

export class EQPUnitInfo extends BasicInfo {
  UnitId?: string;
  UnitStatus?: string;
}

export class EQPControlInfo extends BasicInfo {
  ControlStatus?: string;
  ControlMode?: string;
}

export class EQPCommunicationInfo extends BasicInfo {
  CommunicationStatus?: string;
  CommunicationIP?: string;
  CommunicationPC?: string;
}

export class EQPTerminalInfo extends BasicInfo {
  MessageCode?: string;
  MessageContent?: string;
}

export class LotInfo extends BasicInfo {
  LotId?: string;
  LotType?: string;
  RecipeId?: string;
  RecipeVersion?: string;
  ReticleId?: string;
  WaferInfos?: WaferInfo[] = [];
}

export class WaferProcessInfo extends BasicInfo {
  PPReferenceKey?: string;
  ProcessStatus?: string;
  ProcessStartTime?: any;
  ProcessEndTime?: any;
  LotInfo?: LotInfo;
  WaferInfo?: WaferInfo;
  CassetteInfo?: CassetteInfo;
}

export class CassetteInfo extends BasicInfo {
  LoadPort?: string;
  CassetteSrcId?: string;
  CassetteDestId?: string;
  CassetteType?: string;
  SrcSlotMap?: string;
  PPReferenceKey?: string;
  ProcessStatus?: string;
  LotInfos?: LotInfo[] = [];
}

export class WaferInfo extends BasicInfo {
  WaferId?: string;
  ScribeId?: string;
  CBScribeId?: string;
  SlotID_MES?: string;
  SlotID_EQP_Source?: string;
  SlotID_EQP_Destination?: string;
  ProcessStatus?: string;
}

export class RecipeInfo extends BasicInfo {
  RecipeId?: string;
  Action?: string;
  Operator?: string;
  CompareResult?: string;
  PPReferenceKey?: string;
  Parameters?: any;
}

export class AlarmInfo extends BasicInfo {
  AlarmId?: string;
  AlarmMaker?: string;
  AlarmStatus?: string;
  AlarmText?: string;
  AlarmType?: string;
  AlarmStartTime?: any;
  AlarmEndTime?: any;
}

export class DurableInfo extends BasicInfo {
  DurableId?: string;
  DurableType?: string;
  DurableStatus?: string;
}

export class MonitorInfo extends BasicInfo {
  //單純不想再開一個新的物件 未來有疑問可開成新物件
  URLs?: Array<{ Display: string, Url: string }>;
}

//#endregion DTO

//#region Enum

export enum FabEQPMesStatus {
  RUN = 'RUN',
  IDLE = 'IDLE',
  ENG = 'ENG',
  RPM = 'RPM',
  DOWN = 'DOWN',
  UNKNOWN = 'UNKNOWN',
  CHK = 'CHK',
  QCHECK = 'QCHECK',
  RPE = 'RPE',
  SETUP = 'SETUP',
  CORR = 'CORR',
  INS = 'INS',
  OFF = 'OFF',
  CHZ = 'CHZ',
  MBD = 'MBD',
  WAIT = 'WAIT'
}

export enum FabEQPComStatus {
  CST_ARRIVED = 'CST_ARRIVED',
  CST_REMOVE = 'CST_REMOVE'
}

export enum FabEQPSawStatus {
  QCK2 = 'QCK2',
  UNKNOWN2 = 'UNKNOWN2',
  SAW_WAIT = 'SAW_WAIT'
}

export enum FabEQPGndStatus {
  GND_RUN_PAUSE = 'GND_RUN_PAUSE',
  GND_RUN_ADJUST = 'GND_RUN_ADJUST',
  GND_WARM_UP = 'GND_WARM_UP'
}

export enum WaferProcessStatus {
  Start = 'Start',
  End = 'End'
}

export const FabEQPStatusMap: { [key: string]: string } = {
  RUN: 'bg-success',
  IDLE: 'bg-idle',
  ENG: 'bg-primary',
  RPM: 'bg-rpm',
  DOWN: 'bg-down',
  ALARM: 'bg-alarm',
  UNKNOWN: 'bg-unknown',
  CHK: 'bg-chk',
  QCHECK: 'bg-qcheck',
  RPE: 'bg-rpe',
  CORR: 'bg-corr',
  SETUP: 'bg-setup',
  INS: 'bg-ins',
  OFF: 'bg-off',
  QCK2: 'bg-qck2',
  UNKNOWN2: 'bg-unknown2',
  SAW_WAIT: 'bg-saw-wait',
  GND_RUN_PAUSE: 'bg-gnd-run-pause',
  GND_RUN_ADJUST: 'bg-gnd-run-adjust',
  GND_WARM_UP: 'bg-gnd-warn-up',
  CST_ARRIVED: 'bg-cst-arrived',
  CST_REMOVE: 'bg-cst-remove',
  CHZ: 'bg-chz',
  MBD: 'bg-mbd',
  WAIT: 'bg-wait',
  READY: 'bg-ready',
  PAUSE: 'bg-pause',
  undefined: 'bg-unknown'
};

export const FabEQPColorMap: { [key: string]: string } = {
  'bg-success': 'RUN',
  'bg-warning': 'IDLE',
  'bg-primary': 'ENG',
  'bg-down': 'DOWN',
  'bg-alarm': 'ALARM',
  'bg-rpm': 'RPM',
  'bg-unknown': 'UNKNOWN',
  'bg-chk': 'CHK',
  'bg-qcheck': 'QCHECK',
  'bg-rpe': 'RPE',
  'bg-corr': 'CORR',
  'bg-setup': 'SETUP',
  'bg-ins': 'INS',
  'bg-off': 'OFF',
  'bg-qck2': 'QCK2',
  'bg-unknown2': 'UNKNOWN2',
  'bg-saw-wait': '  SAW_WAIT',
  'bg-gnd-run-pause': 'GND_RUN_PAUSE',
  'bg-gnd-run-adjust': 'GND_RUN_ADJUST',
  'bg-gnd-warn-up': 'GND_WARM_UP',
  'bg-cst-arrived': 'CST_ARRIVED',
  'bg-cst-remove': 'CST_REMOVE',
  'bg-chz': 'CHZ',
  'bg-mbd': 'MBD',
  'bg-wait': 'WAIT'
};

//#endregion Enum
