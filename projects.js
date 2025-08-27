import { Router } from 'express';
import Project from '../models/Project.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
