// ===============================
// 1. src/controllers/project.controller.js
// ===============================

const { ProjectPartUsage, ManufacturerPart, Part, Manufacturer } = require('../models');
const { Project } = require('../models');
// Add this new function at the bottom of the file

exports.getPartReportForProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const usage = await ProjectPartUsage.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: ManufacturerPart,
          include: [
            { model: Part },
            { model: Manufacturer }
          ]
        }
      ]
    });

    const report = usage.map(u => ({
      manufacturer_part_number: u.ManufacturerPart.manufacturer_part_number,
      part_number: u.ManufacturerPart.Part.part_number,
      part_description: u.ManufacturerPart.Part.description,
      part_type: u.ManufacturerPart.Part.part_type,
      manufacturer: u.ManufacturerPart.Manufacturer.name,
      quantity_used: u.quantity_used
    }));

    res.json(report);
  } catch (err) {
    console.error('Error fetching part report:', err);
    res.status(500).json({ error: 'Failed to fetch part report' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.getProjectById = async (req, res) => {
    console.log('Fetching project with ID:', req.params.id);
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const newProject = await Project.create({ name });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    project.name = name;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};