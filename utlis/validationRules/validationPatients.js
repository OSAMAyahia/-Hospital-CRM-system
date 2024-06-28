const {check}=require('express-validator')
const {validationMiddleware}= require('../validationMiddleware')
gets = [check('Id').isMongoId().withMessage("id is not true"),
    validationMiddleware
]

create = [check('first_name').notEmpty().withMessage("first_name is required")
    .isLength({min:2 ,max: 12}).withMessage("first_name length must be betwean 2 to 12 characters" ),
    validationMiddleware
]

updates = [check('Id').isMongoId().withMessage("id is not true"),
    validationMiddleware
]
deletes = [check('Id').isMongoId().withMessage("id is not true"),
    validationMiddleware
]
module.exports = { gets, create,updates,deletes }

