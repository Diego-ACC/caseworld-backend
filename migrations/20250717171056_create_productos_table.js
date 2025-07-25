exports.up = function(knex) {
    return knex.schema.createTable('productos', (table) => {
        table.increments('id').primary(); // id auto-incremental
        table.text('nombre').notNullable();
        table.text('descripcion');
        table.text('categoria');
        table.text('marca');
        table.text('precio'); // en texto para manejar "MXN", etc.
        table.text('imagen_url');
        table.boolean('disponible').defaultTo(true);
  });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('productos');
};
