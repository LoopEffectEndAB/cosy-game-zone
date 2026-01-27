const sql = require('mssql');

// Cấu hình SQL Server - Windows Authentication
const config = {
  server: process.env.DB_SERVER || 'DESKTOP-4A49R3D',
  database: process.env.DB_NAME || 'cosy_game_zone',
  port: parseInt(process.env.DB_PORT || 1433),
  encrypt: process.env.DB_ENCRYPT === 'true',
  trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || 'DESKTOP-4A49R3D\\Dell',
      password: process.env.DB_PASSWORD || ''
    }
  },
  connectionTimeout: 15000,
  requestTimeout: 30000,
};

let pool = null;

// Khởi tạo connection pool
async function init() {
  try {
    if (pool) {
      console.log('✓ Database pool already initialized');
      return pool;
    }

    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✓ Connected to SQL Server successfully');
    console.log(`  Database: ${config.database}`);
    console.log(`  Server: ${config.server}`);

    // Kiểm tra bảng tồn tại
    await verifyTables();

    return pool;
  } catch (err) {
    console.error('✗ Database connection failed:', err.message);
    throw err;
  }
}

// Kiểm tra bảng có tồn tại không
async function verifyTables() {
  try {
    const request = new sql.Request(pool);
    
    // Danh sách bảng cần có
    const requiredTables = ['dbo.users', 'dbo.games', 'dbo.leaderboard', 'dbo.friends'];
    
    const result = await request.query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dbo'
    `);

    const existingTables = result.recordset.map(r => `dbo.${r.TABLE_NAME}`);
    const missingTables = requiredTables.filter(t => !existingTables.includes(t));

    if (missingTables.length > 0) {
      console.warn(`⚠ Warning: Missing tables - ${missingTables.join(', ')}`);
      console.warn('  Please ensure all required tables exist in the database');
    } else {
      console.log('✓ All required tables verified');
    }
  } catch (err) {
    console.warn('⚠ Could not verify tables:', err.message);
  }
}

// Đóng connection pool
async function close() {
  if (pool) {
    try {
      await pool.close();
      pool = null;
      console.log('✓ Database connection closed');
    } catch (err) {
      console.error('✗ Error closing database:', err);
    }
  }
}

// Lấy pool hiện tại
function getPool() {
  if (!pool) {
    throw new Error('Database not initialized. Call init() first.');
  }
  return pool;
}

module.exports = {
  init,
  getPool,
  close,
  sql, // Export sql module để dùng sql.Request, sql.TYPES, etc.
};
