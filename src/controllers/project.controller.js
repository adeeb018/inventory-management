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


// ===============================
// Get part summary for a project
// ===============================
const { sequelize } = require('../models');

exports.getPartSummaryForProject = async (req, res) => {
  const { id } = req.params;
  try {
    const summary = await sequelize.query(
      `
      SELECT 
        mp.manufacturer_part_number,
        p.part_number,
        p.description,
        COALESCE(SUM(u.quantity_used), 0) AS total_used,
        COALESCE(SUM(CASE WHEN sa.to_project_id = :id THEN sa.quantity_adjusted ELSE 0 END), 0) AS moved_in,
        COALESCE(SUM(CASE WHEN sa.from_project_id = :id THEN sa.quantity_adjusted ELSE 0 END), 0) AS moved_out
      FROM manufacturer_parts mp
      JOIN parts p ON p.part_id = mp.part_id
      LEFT JOIN project_part_usage u 
        ON u.manufacturer_part_id = mp.manufacturer_part_id AND u.project_id = :id
      LEFT JOIN stock_adjustments sa 
        ON sa.manufacturer_part_id = mp.manufacturer_part_id 
        AND (sa.to_project_id = :id OR sa.from_project_id = :id)
      GROUP BY mp.manufacturer_part_number, p.part_number, p.description
      ORDER BY p.part_number;
      `,
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(summary);
  } catch (err) {
    console.error('Error generating project part summary:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};
