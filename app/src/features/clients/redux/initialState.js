// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  searchResults: [],
  clientInfo: null,
  ASSISTANCE_REASON: [],
  DISABILITY: [],
  ETHNICITY: [],
  FAMILY_TYPE: [],
  GENDER: [],
  HOUSING: [],
  RACE: [],
  RELTN_TO_HOH: [],
  SSN: [],
  VETERAN: [],
  household: [],
  income_source_obj: [],
  non_cash_obj: [],
  expenditure_obj: [],
  records: [],
  requestSearchPending: false,
  requestSearchError: null,
  requestClientByIdPending: false,
  requestClientByIdError: null,
  requestCodesetPending: false,
  requestCodesetError: null,
  requestNewClientPending: false,
  requestNewClientError: null,
  requestUpdateClientByIdPending: false,
  requestUpdateClientByIdError: null,
  requestClientHouseholdPending: false,
  requestClientHouseholdError: null,
  requestUpdateClientHouseholdPending: false,
  requestUpdateClientHouseholdError: null,
  requestClientRecordsPending: false,
  requestClientRecordsError: null,
};

export default initialState;
