
import { useState, useEffect, useMemo } from 'react';
import '../styles/PracticeProjects.css';
import { practiceProjects } from '../data/practiceProjects';
import type { ProjectTask, ProjectSection, PracticeProject } from '../data/practiceProjects';

const PracticeProjects = () => {
  // State to track checked items (by ID)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);

  // Initial Load
  useEffect(() => {
    const saved = localStorage.getItem('practiceProjectProgress_v2');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Helper to count total tasks recursively
  const countTasks = (items: ProjectTask[]): number => {
    let count = 0;
    for (const item of items) {
      count += 1; // Count item itself
      if (item.subtasks) {
        count += countTasks(item.subtasks);
      }
    }
    return count;
  };

  const totalTasks = useMemo(() => {
    let total = 0;
    practiceProjects.forEach(project => {
      project.sections.forEach(section => {
        total += countTasks(section.items);
      });
    });
    return total;
  }, []);

  // Calculate Progress and Save
  useEffect(() => {
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    if (totalTasks > 0) {
      setProgress(Math.round((checkedCount / totalTasks) * 100));
    }
    localStorage.setItem('practiceProjectProgress_v2', JSON.stringify(checkedItems));
  }, [checkedItems, totalTasks]);


  const handleToggle = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderTask = (task: ProjectTask) => {
    const isChecked = !!checkedItems[task.id];
    return (
      <div key={task.id} className="task-container">
        <li className={`task-item ${isChecked ? 'completed' : ''}`}>
          <div className="task-checkbox-wrapper">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggle(task.id)}
              className="task-checkbox"
            />
            <div className="custom-checkbox"></div>
          </div>
          <span className="task-text">{task.text}</span>
        </li>
        {task.subtasks && task.subtasks.length > 0 && (
          <ul className="subtasks-list">
            {task.subtasks.map(sub => renderTask(sub))}
          </ul>
        )}
      </div>
    );
  };

  const renderSection = (section: ProjectSection) => {
    return (
      <div key={section.title} className="section-group">
        <div className="section-header">
          <span className="section-icon">{section.icon}</span>
          <span className="section-title" style={{ color: section.color }}>{section.title}</span>
        </div>
        <ul className="task-list">
          {section.items.map(item => renderTask(item))}
        </ul>
      </div>
    );
  };

  const renderProjectCard = (project: PracticeProject) => {
    // Calculate per-project progress
    let projectTotal = 0;
    let projectChecked = 0;

    const countProjectTasks = (items: ProjectTask[]) => {
      items.forEach(item => {
        projectTotal++;
        if (checkedItems[item.id]) projectChecked++;
        if (item.subtasks) countProjectTasks(item.subtasks);
      });
    };

    project.sections.forEach(s => countProjectTasks(s.items));
    const projectPercent = projectTotal === 0 ? 0 : Math.round((projectChecked / projectTotal) * 100);

    return (
      <article key={project.id} className="project-card">
        <div className="project-header">
          <div className="project-title">
            <h2>{project.title}</h2>
          </div>
          <div className="card-progress">
            {projectPercent}% Done
          </div>
        </div>
        <div className="project-content">
          {project.sections.map(section => renderSection(section))}
        </div>
      </article>
    );
  };

  return (
    <div className="practice-projects-page">
      {/* Sticky Progress Header */}
      <div className="progress-sticky-header">
        <div className="progress-info">
          <div className="progress-label">
            <span>🔥</span> Elite Roadmap Progress
          </div>
          <div className="progress-percentage">{progress}%</div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="projects-hero">
        <h1 className="projects-title">Elite Backend Projects</h1>
        <p className="projects-subtitle">Master scalable systems through 7 hardcore challenges.</p>
      </section>

      {/* Projects List */}
      <div className="projects-container">
        {practiceProjects.map(project => renderProjectCard(project))}
      </div>

      {/* Suggested Order */}
      <div className="suggested-order">
        <h3>🚀 Suggested Order (8 Weeks)</h3>
        <div className="order-grid">
          <span className="order-item">Week 1–2: Slow API + DB</span>
          <span className="order-item">Week 3: Auth & Roles</span>
          <span className="order-item">Week 4: Architecture Refactor</span>
          <span className="order-item">Week 5: Production Debugging</span>
          <span className="order-item">Week 6: GraphQL Performance</span>
          <span className="order-item">Week 7: Scalability</span>
          <span className="order-item">Week 8: Polish + Case Studies</span>
        </div>
      </div>
    </div>
  );
};

export default PracticeProjects;
