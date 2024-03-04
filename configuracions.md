# Proyecto Interconectados


### `Herramientas para instalar IX:`

* Instalar [Apache Netbeans](https://drive.google.com/file/d/1N9mkuW2dIBv7wpz7kQg82-B732fMlSDx/view?usp=drive_link)
* Instalar [plugins de Netbeans: apache tomcat y nb-springboot](https://drive.google.com/file/d/1Sbd-0fOVrGEk5B-HHwKKU2AAnG8eEVH7/view?usp=drive_link)
  * si No se puede descargar directamente desde Netbeans, esta seria una opción 
* Instalar [java version 8](https://drive.google.com/file/d/18ZXAAYFFm1pkFRO9Rm6V0NbfChOdHOn6/view?usp=drive_link)
* Instalar  [wildfly 19.0.1](https://drive.google.com/file/d/1f0u1ekI42L2Eb9mzRR-jCa6Crv1_VTPa/view?usp=drive_link).
  * es importante usar esta version de wildfly ya que se hicieron pruebas con 
    versiones nuevas y arrojaba error en splap.
* Instalar [node version 16](https://drive.google.com/file/d/15HL5FKrhcxZosKGGrd2QKwyCFJMnsl6h/view?usp=drive_link)
* Instalar [Apache maven 3.9.0](https://drive.google.com/file/d/1GFaklVK0eeeeY7q6CsxZNkqFDftaq88M/view?usp=drive_link)
* Instalar [yarn version 1.22](https://drive.google.com/file/d/1E9SgnnA2kZ2l7ymJwOXDBhvLMUotZuJ8/view?usp=drive_link)
* Instalar [postgresql](https://drive.google.com/file/d/1FVD85PClCR5rOTGitHCdAkWXj3F4GWSi/view?usp=drive_link)
* Realizar [restore a base de datos](https://drive.google.com/file/d/15XaKC5X6RKNarPJZh6Pth0cJBPXiu2cr/view?usp=drive_link)
  * tomar en cuenta que hay que configurar el datasource en el back y en wildfly ó como segunda opción usarlo en local en el properties del back colocar estas lineas ejemplo:
  * Para ejecutar en Home Noel:
spring.datasource.url=jdbc:postgresql://localhost:5432/interconectados
spring.datasource.username = postgres
spring.datasource.password = postgres

-----------------------------------------

### `Configuración del servidor wildfly:`

* descargar wildlfly del enlace de arriba, copiar la carpeta en disco C:/
  * puedes crear una carpeta llamada server para mejor control
* dentro de la carpeta de wildfly, buscar la carpeta bin y ejecutar como administrador add-user
* para configurar el usuario y la clave:
  *  opcion a) Management User
  *  escribir un usuario
  *  escribir 'yes' si estas seguro del User
  *  escribir password
  *  escribir 'yes' si estas seguro del password
  *  repetir el password
  *  yes a todo
  *  Listo
* Luego en Netbeans ir a la pestaña 'Services'/servers:
  *  en server darle click derecho, add server
  *  selecciona wildFly Application Server y luego next
  *  selecciona la ubicación donde esta instalado wildFly en C:/ y luego next
  *  coloca el User y Password de wildFly que se agregó en el paso enterior
  *  para ver que funciona el server, en el mismo netbeans/services/servers/wildfly .../ darle click derecho y start
  *  para ver el administrador: localhost:9990 y colocar user y password
  *  En netbeans / click derecho en el proyecto a usar / seleccionar properties / run / elegir el servidor wildfly y la version de java que estamos usando
  *  Listo!
  *  [Ver video de configuración](https://drive.google.com/file/d/11J2w1Ix7xsi2GxIsBx8qoyAhfxCRc3vQ/view?usp=drive_link)

-----------------------------------------

### `Configuración del datasource:`

* descargar [driver Postgresql](https://drive.google.com/file/d/1co77P4rln6PC-dN-2U9aQJghOfKpSAUZ/view?usp=drive_link)
  
* Hay que editar el standalone pero para saber cuál hay que editar, podemos verlo en netbeans:
  * netbeans /  services /  servers / wildfly Aplication Server le damos click derecho / properties / Configuration File .....standalone-full.xml

![Alt text](/img/1.png)

*

![Alt text](/img/2.png)
  

-----------------------------------------
### `Pasos para correr el proyecto`

* Instalar las dependencias con yarn install
* Levantar el proyecto con yarn start (automaticamente levanta en puerto 3000)
* Tomar en cuenta el archivo .env (para local) antes de crear el build se debe
  sustituir por la ip de splap (192.168.211.106), para esto solo sustituimos el archivo Qaenv por .env
* para generar el build: yarn build



-----------------------------------------


### `Pasos para correr el proyecto`

* Instalar las dependencias con yarn install (si no se han instalado)
* Levantar el proyecto con yarn start (automaticamente levanta en puerto 3000)
* Tomar en cuenta el archivo .env (para local) antes de crear el build se debe
  sustituir por la ip de splap (192.168.211.106), para esto solo sustituimos el archivo Qaenv por .env
* para generar el build: yarn build