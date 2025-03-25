## Contabilidad

### arquitectura

Usamos Next.js, Shadcn, MongoDb en localhost. Usar los componentes de shadcn para el diseño. 

Usamos zod para la validación de los datos.
React hook form para el manejo de los formularios.
mongodb 

No toques ni instales el tailwind ya que lo estropeas.

Usa server actions para las acciones que se realizan en el servidor.

Grabar los datos en una base de datos mongodb local.

No tocar los ficheros de tailwind no el global.css.

No poner datos fake.

### Modelo de datos

#### Empresa

id: Number
nif: String
nombre: String

#### Ejercicio

year: Number
id_empresa: Number
ultimo_asiento: Number
ultima_factura_emitida: Number
ultima_factura_recibida: Number
suma_debe: Number
suma_haber: Number

### Niveles

id: Number
nombre: String

#### Cuenta

id: Number
nombre: String

#### Saldos

id_empresa: Number
ejercicio: Number
id_cuenta: Number
mes: Number
debe: Number
haber: Number

#### Asiento

id_empresa: Number
ejercicio: Number
ultimo_apunte: Number
debe: Number
haber: Number

#### Apunte

id_empresa: Number
ejercicio: Number
id_asiento: Number
id_apunte: Number
fecha: Date
codigo_concepto: String
concepto: String
cuenta_debe: Number
cuenta_haber: Number
importe: Number

#### Conceptos

id: Number
nombre: String

#### Factura

id_empresa: Number
id_factura: Number
id_asiento: Number
su_factura: string
tipo_factura: "emitida" | "recibida"
fecha: Date
tabla_cuentas:
    cuenta_debe: Number
    cuenta_haber: Number
    importe: Number
tabla_iva:
    tipo: number
    base: number
    importe: number


### Interfaz
En la home presentamos mensajes sobre el sistema contable, con un enlace al dashboard.

En el dasboard presentamos la lista de empresa, permitiendo añadir una nueva empresa, editar una empresa, eliminar una empresa y ver el detalle de una empresa.

En el detalle de la empresa presentamos el nombre, el nif y una lista con los ejercicios de la empresa. Podremos crear un nuevo ejercicio.

Por el detalle del ejercico tenemos un layout con cuentas, conceptos, niveles, asientos, facturas. 

En la sección de cuentas podemos crear una nueva cuenta, editar una cuenta, eliminar una cuenta y ver el detalle de una cuenta.

En la sección de conceptos podemos crear un nuevo concepto, editar un concepto, eliminar un concepto y ver el detalle de un concepto.

En la sección de niveles podemos crear un nuevo nivel, editar un nivel, eliminar un nivel y ver el detalle de un nivel. 

En la sección de asientos podemos crear un nuevo asiento, editar un asiento, eliminar un asiento y ver el detalle de un asiento. El ultimo asiento se obtiene del ejercicio actual. En la pagina de alta/modificacion del asiento aparece los apuntes ya existentes. Cuando se graba el apunte se ha de actualizar los saldos de las cuentas, teniendo en cuenta el ejercicio las cuentas y la fecha del asiento.

En la sección de facturas podemos crear una nueva factura, editar una factura, eliminar una factura y ver el detalle de una factura. Permitir elegir entre emitida o recibida. Cuando se crea una factura se crea un asiento contable con las cuentas introducidad y el iva correspondiente a la cuenta del iva.









