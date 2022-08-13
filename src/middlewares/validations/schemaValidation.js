const validateSchema = (schema) => {
    
    return (req,res,next) => {
        const body =  req.body;
        const validation =  schema.validate(body, {abortEarly: false});
        if(validation.error){
            const details = validation.error.details;
            const erros = details.map(details => {
                const erro = details.path
                const message = details.message.split(" ").splice(1).join(" ");
                return {[erro]: message}
            })
            return res.status(422).send(erros)
        };
        next();
    }
};

export default validateSchema;