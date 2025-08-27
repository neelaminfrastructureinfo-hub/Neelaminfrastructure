import { Router } from 'express';
import Timesheet from '../models/Timesheet.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

// List timesheets (admin sees all, employee sees own)
router.get('/', auth, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
  const rows = await Timesheet.find(filter).populate('user', 'name email').sort({ date: -1 });
  res.json(rows);
});

// Create timesheet (employee or admin)
router.post('/', auth, async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user._id };
    const t = await Timesheet.create(payload);
    res.json(t);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update (owner or admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const existing = await Timesheet.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    if (String(existing.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await Timesheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete (owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const existing = await Timesheet.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    if (String(existing.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await Timesheet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
