#devMatch

-create vite application with react
-remove unnecessary files.
- install talwind css
- install daisy ui
-add navabar component to App.jsx


//Deployment
-sign in aws
- create ec2 instance
-chmod 400 <secret>.pem
-$ ssh -i ~/devMatch-secret.pem ubuntu@13.61.152.198   // connecting server in ubuntu
-install node js on server by nvm
-- git clone
-- go to the project directory and
-- npm install -dependis install
-- npm run build     --  will create dist folder which is all our code in chunks
--sudo apt update - -update the system
-- sudo apt install nginx --
-- sudo systemctl start nginx
-- sudo systemctl  enable nginx
-- copy code means dist folder (build folder) to var/www/html/
// sudo scp -r dist/* /var/www/html
--enable port :80 of your instance.  to go into security  g-0bbbf66f8d417 - launch-wizard-1  add port 80  and 0.000.00 in aws
//aws block all port we need to add the port like above