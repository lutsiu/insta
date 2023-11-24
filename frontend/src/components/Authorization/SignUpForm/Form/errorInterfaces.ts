interface ValidatorError {
  type: string,
  value: string,
  msg: string,
  path: string
}
export interface ValidationError400 {
  errors: ValidatorError[] 
}
export interface ValidationError409 {
  errorField: string,
  message: string
}