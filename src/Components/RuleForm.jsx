import React, { useState } from 'react';
import "./style.css"
import { createRuleService } from '../service/ruleService';
const RuleForm = () => {
  const [title, setTitle] = useState('');
  const [rule, setRule] = useState('');
  const [rules, setRules] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddRule = () => {
    if (!rule) {
      alert('Please fill rule fields');
      return;
    }
    
    if (editIndex !== -1) {
      const updatedRules = [...rules];
      updatedRules[editIndex] = rule;
      setRules(updatedRules);
      setEditIndex(-1);
    } else {
      setRules([...rules, rule]);
    }
    setRule('');
  };

  const handleEdit = (index) => {
    
    setRule(rules[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  const handleCreateRule = async() => {
    
    try {
        const payload = {
            "title":title,
            "rules":rules
        }
        console.log('paylaod',payload)
        const result = await createRuleService(payload)
        console.log(result)
        alert('rule created successfully')
    }
    catch(err) {
        console.log(err)
        alert("failed to create")
    }
  };


  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Create Rule</h2>
        </div>
        
        <div className="card-content">
          <div className="form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter rule title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Rule</label>
              <textarea
                type="text"
                placeholder="Enter rule description"
                value={rule}
                onChange={(e) => setRule(e.target.value)}
              />
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleAddRule}
            >
              {editIndex !== -1 ? 'Update Rule' : 'Add Rule'}
            </button>
          </div>

          <div className="rules-list">
            <h3 className="list-title">List of Rules</h3>
            {rules.length === 0 ? (
              <div className="no-rules">No rules added yet</div>
            ) : (
              rules.map((item, index) => (
                <div key={index} className="rule-item">
                  <div className="rule-number">{index + 1}</div>
                  <div className="rule-content">
                    <h4>#{rules.length}</h4>
                    <p>{item}</p>
                  </div>
                  <div className="rule-actions">
                    <button 
                      onClick={() => handleEdit(index)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card-footer">
          <button 
            onClick={handleCreateRule}
            className="btn btn-success"
            disabled={rules.length === 0}
          >
            Create Rule
          </button>
        </div>
      </div>
    </div>
  );
};


export default RuleForm;