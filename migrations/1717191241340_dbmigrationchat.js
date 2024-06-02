
exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createTable('users', {
    id:  { type: 'bigserial', notNull: true,primaryKey:true },
    login: { type: 'varchar(200)', notNull: true },
    password: { type: 'varchar(200)', notNull: true },
    admin:{type:'boolean',default:false},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

    pgm.createTable('logado', {
    id_login:  { type: 'bigserial',
                 notNull: true,
                 primaryKey:true,
                 references:'users(id)' },
    logado: { type:'boolean',default:false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

};

exports.down = (pgm) => {
	pgm.dropTable('users',{cascade:true});
	pgm.dropTable('logado',{cascade:true});
};
