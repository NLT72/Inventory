export default class Usermodel{
    constructor(id, name, email, password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }
    static add(name, email , password){
        const newuser= new Usermodel(user.length+1, name, email, password);
        user.push(newuser);
    }
    static Validateuser(email, password){
        const result=user.find((u)=>u.email==email && u.password==password);
        return result;
    }
}
var user=[];