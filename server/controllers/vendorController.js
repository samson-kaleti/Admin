const pool = require("../db/database");

// Create a new vendor
exports.createVendor = async (req, res) => {
  const { company_name, contact_email, contact_phone_number, business_type } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO vendor (company_name, contact_email, contact_phone_number, business_type) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [company_name, contact_email, contact_phone_number, business_type]
    );
    res.status(201).json({ success: true, vendor: result.rows[0] });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM vendor`);
    res.status(200).json({ success: true, vendors: result.rows });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a vendor by ID
exports.getVendorById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM vendor WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor: result.rows[0] });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a vendor
exports.updateVendor = async (req, res) => {
  const { id } = req.params;
  const { company_name, contact_email, contact_phone_number, business_type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE vendor
       SET company_name = $1, contact_email = $2, contact_phone_number = $3, business_type = $4 
       WHERE id = $5 RETURNING *`,
      [company_name, contact_email, contact_phone_number, business_type, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor: result.rows[0] });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM vendor WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
