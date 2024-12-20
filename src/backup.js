const { exec } = require('child_process');
const fs = require('fs');

// Thông tin sao lưu
const dbUser = 'root';
const dbPassword = 'root';
const dbName = 'architecture';
const backupFolder = './backups';  // Thư mục lưu trữ sao lưu

// Kiểm tra thư mục sao lưu và tạo nếu không tồn tại

const backup = ()=>{
    if (!fs.existsSync(backupFolder)) {
        fs.mkdirSync(backupFolder);
      }
        const backupFileName = `backup_${new Date().toISOString().slice(0, 10)}.sql`;  // Tên file sao lưu, ví dụ: backup_2024-12-20.sql
      
      const command = `docker exec mysql-container /usr/bin/mysqldump -u ${dbUser} -p${dbPassword} ${dbName}> ${backupFolder}/${backupFileName}`;
      
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error occurred: ${stderr}`);
          return;
        }
        console.log(`Database backup successful! Backup saved to: ${backupFolder}/${backupFileName}`);
      });
}

module.exports = backup