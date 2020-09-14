module.exports=(sequelize,DateTypes)=>{
    const User = sequelize.define('User',{
        userid:{
            type:DateTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        password:{
            type:DateTypes.STRING(100),
            allowNull:false
        },
        nickname:{
            type:DateTypes.STRING(30),
            allowNull:false
        },
        email:{
            type:DateTypes.STRING(30),
            allowNull:false
        }
    },{
        charset:'utf8',
        collate:'utf8_general_ci',
    })
    User.associate=(db)=>{};
    return User;
}