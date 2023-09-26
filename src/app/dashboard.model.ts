/* eslint-disable require-jsdoc */

export class BaseModelComplianceReporting {
  UserPermissions: string;
  ProjectOid: number;
}
// Show Charts Output Input
export class ShowChartsInput {
  UserPermissions: string;
  ProjectOid: number;
  Year: number;
  TradeProgramName: string;
  Term: string;
  ContractType: string;
  StoreType: string;
  Area: string;
  Region: string;
  Territory: string;
  Broker: string;
  Distributor: string;
  Headquarter: string;
  EnrolledBy: string;
  Chain: string;

  MwcParentChainName: string;
  MwcDivChainName: string;
  SalesDirector: string;
  DsmBrokerManager: string;
  CdmAccountManager: string;
  District: string;
  SubDistrict: string;
  DistArea: string;
  DistSalesRep: string;
  RetailArea: string;
  RetailSalesRep: string;
  KeyAccount: string;
}
export class ShowChartsOutput {
  PieChartData: PieChart[];
  BarChartData: BarChart[];
}
export class PieChart {
  OnTrackStatus: string;
  StoreCount: number;
  OnTrackPercentage: number;
  OnTrackPercentageText: string;
  TotalRecords: number;
}
export class BarChart {
  RebateCategoryCount: number;
  NoOfStoresOnTrack: number;
  RebateCategory: string;
  BarChartAdditionalData: BarChartAdditionalDataModel;
}
export class BarChartAdditionalDataModel {
  TotalRecords: number;
  RebateCategory: string;
  RebateCategoryCount: number;
  NoOfStoresOnTrack: number;
  OnTrackPercentage: number;
  OnTrackStoresX: number;
  OnTrackStoresY: number;
  EnrolledStoresX: number;
  EnrolledStoresY: number;
  onTrackPercentageY: number;
  FormattedEnrolledStores: string;
  FormattedOnTrackStores: string;
  FormattedOnTrackPercentage: string;
}
// Mandatory Input Output
export class MandatoryDropdownDataInput {
  public UserPermissions: string;
  public ProjectOid: number;
}
export class MandatoryDropdownDataModel {
  ProjectOid: number;
  ComplianceYear: number;
  TradeProgramName: string;
  CompliancePeriod: string;
}
export class MandatoryDropdownDataOutput {
  LastUpdatedOn: string;
  WeekEndingDate: string;
  MandatoryDropdownData: Array<MandatoryDropdownDataModel>;
}

// dashboard items
export class DashboardModel {
  UserPermissions: string;
  ProjectOid: number;
  Year: number;
  TradeProgramName: string;
  Term: string;
  ContractType: string;
  StoreType: string;
  Area: string;
  Region: string;
  Territory: string;
  Broker: string;
  Distributor: string;
  Headquarter: string;
  EnrolledBy: string;
  Chain: string;

  MwcParentChainName: string;
  MwcDivChainName: string;
  SalesDirector: string;
  DsmBrokerManager: string;
  CdmAccountManager: string;
  District: string;
  SubDistrict: string;
  DistArea: string;
  DistSalesRep: string;
  RetailArea: string;
  RetailSalesRep: string;
  KeyAccount: string;
}

export class SingleSelectionDropdowndata {
  Value: string;
  Text: string;
}

export class DashboardCollection {
  // year is a number so generic class [SingleSelectionDropdowndata]
  // can't be used here
  Year: YearDropdown[];
  TradeProgram: SingleSelectionDropdowndata[];
  Term: SingleSelectionDropdowndata[];
  PieChart: PieChart[];
  BarChart: BarChart[];
  SavedFilters: SingleSelectionDropdowndata[];
}

export class YearDropdown {
  Value: number;
  Text: number;
}

// Filter dropdown input output models

export class FilterDropdownInput extends BaseModelComplianceReporting {
  ComplianceYear: number;
  TradeProgramName: string;
  Term: string;
  ContractType: string;
  StoreType: string;
  Area: string;
  Region: string;
  Territory: string;
  Broker: string;
  Distributor: string;
  Headquarter: string;
  EnrolledBy: string;
  Chain: string;
  MwcParentChainName: string;
  MwcDivChainName: string;
  SalesDirector: string;
  DsmBrokerManager: string;
  CdmAccountManager: string;
  District: string;
  SubDistrict: string;
  DistArea: string;
  DistSalesRep: string;
  RetailArea: string;
  RetailSalesRep: string;
  KeyAccount: string;
}
export class Dropdowndata {
  Value: string;
  Text: string;
}

export class ApiDropdownData extends Dropdowndata {}

export class FilterDropdownOutput {
  StoreTypeData: Dropdowndata[];
  AreaData: Dropdowndata[];
  RegionData: Dropdowndata[];
  TerritoryData: Dropdowndata[];
  DistributorData: Dropdowndata[];
  HeadquarterData: Dropdowndata[];
  ChainData: Dropdowndata[];
  EnrolledByData: Dropdowndata[];

  MwcParentChainNameData: Dropdowndata[];
  MwcDivChainNameData: Dropdowndata[];
  SalesDirectorData: Dropdowndata[];
  DsmBrokerManagerData: Dropdowndata[];
  CdmAccountManagerData: Dropdowndata[];
  DistrictData: Dropdowndata[];
  SubDistrictData: Dropdowndata[];
  DistAreaData: Dropdowndata[];
  DistSalesRepData: Dropdowndata[];
  RetailAreaData: Dropdowndata[];
  RetailSalesRepData: Dropdowndata[];
  KeyAccountData: Dropdowndata[];
}

// grid

export class ComplianceGridInput {
  public p_user_permissions: string;
  public p_project_oid: number;
  public p_compliance_year: number;
  public p_trade_program_name: string;
  public p_term: string;
  public p_contract_type: string;
  public p_store_type: string;
  public p_area: string;
  public p_region: string;
  public p_territory: string;
  public p_broker: string;
  public p_dist_name: string;
  public p_sales_rep: string;
  public p_chain: string;
  public p_flag: string;
}

export class WeeklyPurchaseProgressItem {
  public RebateSection: string;
  public ComplianceWeek: number;
  public ComplianceWeekDate: string;
  public ComplianceMonth: number;
  public ComplianceMonthName: string;
  public ComplianceMonthWeekNumber: string;
  public EnrolledQuantity: number;
  public ReceievedQuantity: number;
  public FulfilledQuantity: number;
}

export interface ComplianceInfo {
  V2ComplianceLanding: ContractComplianceInfo[];
}

export interface ContractComplianceInfo {
  MTP_CLIENT_ENROLLMENT_OID: number;
  CONTRACT_NUMBER: string;

  V2ComplianceStores: StoreComplianceInfo[];
}

export interface StoreComplianceInfo {
  STORE_RETAIL_NUMBER: string;

  DIST_OID: number;
  DIST_NAME: string;
}
