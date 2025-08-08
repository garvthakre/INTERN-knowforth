import pool from '../config/db.js';

export const saveCompAddress = async (req, res) => {
  try {
    const { address_type, address_line, city, state_id, country_iso, pincode } = req.body;
    
    // Basic validation
    if (!address_line || !city || !state_id || !country_iso) {
      return res.status(400).json({ msg: 'Address line, city, state, and country are required' });
    }

    const result = await pool.query(
      `INSERT INTO company_addresses (company_id, address_type, address_line, city, state_id, country_iso, pincode)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.company_id, address_type, address_line, city, state_id, country_iso, pincode]
    );
    
    res.status(201).json({
      msg: 'Address saved successfully',
      address: result.rows[0]
    });
  } catch (err) {
    console.error('Save address error:', err);
    res.status(500).json({ msg: 'Failed to save address', error: err.message });
  }
};

export const getCompAddresses = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM company_addresses WHERE company_id = $1 ORDER BY id DESC', 
      [req.params.compid]
    );
    
    res.json({
      msg: 'Addresses retrieved successfully',
      addresses: result.rows
    });
  } catch (err) {
    console.error('Get addresses error:', err);
    res.status(500).json({ msg: 'Error retrieving addresses', error: err.message });
  }
};

export const getACompAddress = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM company_addresses WHERE id = $1', 
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Address not found' });
    }
    
    res.json({
      msg: 'Address retrieved successfully',
      address: result.rows[0]
    });
  } catch (err) {
    console.error('Get address error:', err);
    res.status(500).json({ msg: 'Error fetching address', error: err.message });
  }
};

export const updateCompAddress = async (req, res) => {
  try {
    const { id, address_type, address_line, city, state_id, country_iso, pincode } = req.body;
    
    // Basic validation
    if (!id) {
      return res.status(400).json({ msg: 'Address ID is required' });
    }

    // Check if address exists
    const checkResult = await pool.query(
      'SELECT id FROM company_addresses WHERE id = $1', 
      [id]
    );
    
    if (checkResult.rowCount === 0) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    const result = await pool.query(
      `UPDATE company_addresses SET 
        address_type = $1, 
        address_line = $2, 
        city = $3, 
        state_id = $4,
        country_iso = $5, 
        pincode = $6 
       WHERE id = $7 RETURNING *`,
      [address_type, address_line, city, state_id, country_iso, pincode, id]
    );
    
    res.json({
      msg: 'Address updated successfully',
      address: result.rows[0]
    });
  } catch (err) {
    console.error('Update address error:', err);
    res.status(500).json({ msg: 'Error updating address', error: err.message });
  }
};

export const deleteCompAddress = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM company_addresses WHERE id = $1 RETURNING *', 
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Address not found' });
    }
    
    res.json({
      msg: 'Address deleted successfully',
      deletedAddress: result.rows[0]
    });
  } catch (err) {
    console.error('Delete address error:', err);
    res.status(500).json({ msg: 'Error deleting address', error: err.message });
  }
};