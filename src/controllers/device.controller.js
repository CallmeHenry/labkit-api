import Device from '../models/device.model.js';

const createDevice = async (req, res) => {
  try {
    const { name, type, status, serialNumber, description } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    const device = await Device.create({
      name,
      type,
      status,
      serialNumber,
      description,
      createdBy: req.userid
    });

    return res.status(201).json(device);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    return res.json(devices);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.json(device);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { name, type, status, serialNumber, description } = req.body;
    
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      { name, type, status, serialNumber, description },
      { new: true, runValidators: true }
    );

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.json(device);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createDevice, getAllDevices, getDeviceById, updateDevice, deleteDevice };
