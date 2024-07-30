class ApiError extends Error{
    constructor(
        statusCode,
message="Something went wrong",
errors=[],
stack=""
    ){
       super(message) 
       this.startCode=statusCode
       this.data=null,
       this.message=message
       this.success=false;
       this.errors=errors
         if(stack){
            this.stack=stack
         }else{
            Error.captureStackTraxce(this,this.constructor)
         }

    }
}
export {ApiError}