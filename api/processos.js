const Client = require('../connection/get-client');
var bodyParser = require('body-parser')
const {body,validationResult } = require('express-validator');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const client=Client.client()


const getUsersLogiPassword=(request, response) => {
   
      if (request.body.login==undefined || request.body.password==undefined) {
            return response.status(400).json({ errors: [{msg:'Parametro não encontrado ou id vazio'}] });
      }

   let login = request.body.login;
   let password = request.body.password;

  client.query(`SELECT * FROM users where login='${login}' and password='${password}'`, (error, results) => {
    if (error) {
        console.log("Erro ao tentar buscar dados");
      throw error
    }else{
          //res.sendFile(__dirname + '/static/index.html');
        if(results.rows.length==0){
          return response.status(400).json({data:{msg:"Usuario o senha não encontrado !!"}});     
        }
        response.status(200).json({data:results.rows,status:1}) 
    }
    
  })

}


const getUsers = (request, response) => {
  client.query('SELECT * FROM users ', (error, results) => {
    if (error) {
        console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const getUsersId = (request, response) => {
  const id = parseInt(request.params.id)
  client.query('SELECT * FROM users where id=$1',[id], (error, results) => {
    if (error) {
        console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const addUsers = (request, response) => {
  const er = validationResult(request);

     if (!er.isEmpty()) {
        return response.status(400).json({ errors: er.array() });
      }
 
    const {login,password,admin} = request.body

   if(login==undefined){
         response.status(500).json({menssagem:"Campo login é obrigatorio"})
         return false
   }

   if(password==undefined){
         response.status(500).json({menssagem:"Campo password é obrigatorio"})
         return false
   }

   if(admin==undefined){
      admin=false;      
   }

  client.query('insert into users(login,password,admin) values($1,$2,$3) RETURNING *',[login, password,admin], (error, results) => {
    if (error) {
        response.status(500).json({menssagem:"Erro ao tentar grava os dados!!!"})
        throw error
    }else{
      response.status(201).send(`Usuario adcionado com sucesso \n ID: ${results.rows[0]['id']}`)
    }
    
  })

}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { login, password,admin } = request.body

	 if (isNaN(id) || id==undefined) {
	 	return response.status(400).json({ errors: [{msg:'Parametro não encontrado ou id vazio'}] });
	 }

 client.query('select * from users where id =$1',[id], (error, results)  => {
     if (error) {
  	   return response.status(400).json({ errors: [{msg:'Erro ao tentar altera o usuario'}] });
     }else{
     	var sets='',update=false,vir=``;

     	if (login!=undefined && login!='') {
           sets+=` ${vir} login='${login}'`;
           vir=`,`
           update=true;
     	}
     	
     	if(password!=undefined && password!='') {
            sets+=` ${vir} password='${password}'`;
             vir=`,`
            update=true;
     	}

     	if(admin!=undefined && admin!='') {
            sets+=` ${vir} admin='${admin}'`;
            vir=`,`
            update=true;
     	}
         if (update) {
              client.query(`update users set ${sets} where id =$1`,[id], (error, results)  => {
                 if(error){
                 	return response.status(400).json({data:{msg:"Erro ao tentar alterar"}});
                 }
                 return response.status(200).json({data:{msg:"Dados alterado com sucesso"}});
              })
         }else{
             return response.status(400).json({data:{msg:"Não foi possivel altera os dados"}});     
         }
        

     }
    
  });
}


const deleteUsers = (request, response) => {
	const id = parseInt(request.params.id)
   	 if (isNaN(id) || id==undefined) {
	 	return response.status(400).json({ errors: [{msg:'Parametro não encontrado ou id vazio'}] });
	 }

	 client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {

    	return response.status(400).json({data:{msg:"Erro ao tentar deletar"}});
      throw error
    }
    response.status(200).send(`Usuario deletado com sucesso \nID: ${id}`)
  })

}

const getUsersLogado = (request, response) => {
  client.query('select id,login from logado inner join users on users.id=id_login where logado=$1',[true], (error, results) => {
    if (error) {
        console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
  })

}

module.exports = {
   getUsers,
   getUsersId,
   addUsers,
   updateUser,
   deleteUsers,
   getUsersLogiPassword,
   getUsersLogado
}
