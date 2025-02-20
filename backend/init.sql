-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial product data
INSERT INTO products (name, sku, price, stock_quantity) VALUES
    ('Laptop Dell XPS 13', 'DELL-XPS13-001', 1299.99, 25),
    ('iPhone 15 Pro', 'APPL-IP15P-002', 999.99, 50),
    ('Samsung 4K TV', 'SMSNG-TV4K-003', 799.99, 15),
    ('Sony WH-1000XM4', 'SONY-WH1000-004', 349.99, 30),
    ('Gaming Mouse Logitech', 'LOG-GM502-005', 79.99, 100),
    ('Mechanical Keyboard', 'MECH-KB101-006', 129.99, 45),
    ('iPad Air', 'APPL-IPAD-007', 599.99, 35),
    ('Wireless Charger', 'WRLSS-CHG-008', 29.99, 150),
    ('USB-C Hub', 'USBC-HUB-009', 49.99, 75),
    ('External SSD 1TB', 'SSD-1TB-010', 159.99, 60)
ON CONFLICT (sku) DO NOTHING;
