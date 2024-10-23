import React, { useEffect, useState } from 'react';
import { evaluateUserService, getRulesService } from '../service/ruleService';

const EvaluateForm = () => {
  // Sample rules data (you can replace this with your dynamic rules)
  const [rules,setRules] = useState([
    {
      title: 'Rule 1',
      rules: ['Sub-rule 1.1', 'Sub-rule 1.2', 'Sub-rule 1.3'],
    },
    {
      title: 'Rule 2',
      rules: ['Sub-rule 2.1', 'Sub-rule 2.2'],
    },
    {
      title: 'Rule 3',
      rules: ['Sub-rule 3.1', 'Sub-rule 3.2', 'Sub-rule 3.3', 'Sub-rule 3.4'],
    },
  ]);

  const getAllRules = async() => {
    const result = await getRulesService()
    console.log('rules ->',result)
    if(result.Response) {
        setRules(result.Response)
    }
  }
  useEffect(() => {
    getAllRules()
  },[])
  const [selectedRule, setSelectedRule] = useState(null);
  const [evaluation, setEvaluation] = useState('');

  // Handle rule selection
  const handleRuleClick = (rule) => {
    setSelectedRule(rule);
    setEvaluation(''); // Reset evaluation text when selecting a new rule
  };

  // Handle evaluation text change
  const handleEvaluationChange = (e) => {
    setEvaluation(e.target.value);
  };

  // Handle evaluation button click
  const handleEvaluate = async() => {
    try {
        if (selectedRule && evaluation) {
            const data = JSON.parse(evaluation)
            const payload = {
              "rule_id":selectedRule.id,
              "data":data
            }
            console.log(payload)
            const result = await evaluateUserService(payload)
            console.log(result)
            alert("User evaluation : "+result.Response.toString())
          } else {
            alert('Please select a rule and add your evaluation.');
          }
    }
    catch(err) {
        console.log(err)
        alert("something went wrong")
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Evaluate Rule</h2>

      {/* Instruction Note */}
      <p style={styles.instruction}>
        Choose a rule that you want to use against the user data, and add the user data below.
      </p>

      {/* List of rules */}
      <ul style={styles.ruleList}>
        {rules.map((rule, index) => (
          <li
            key={index}
            style={styles.ruleItem}
            onClick={() => handleRuleClick(rule)}
          >
            {rule.title}
          </li>
        ))}
      </ul>

      {/* Display sub-rules and textarea only if a rule is selected */}
      {selectedRule && (
        <div style={styles.evaluationForm}>
          <h3 style={styles.subHeading}>Sub-rules of {selectedRule.title}</h3>
          <ul style={styles.subRuleList}>
            {selectedRule.rules.map((subRule, index) => (
              <li key={index} style={styles.subRuleItem}>
                {subRule}
              </li>
            ))}
          </ul>

          {/* Textarea for evaluation */}
          <textarea
            style={styles.textarea}
            placeholder="Add the user data here for evaluation..."
            value={evaluation}
            onChange={handleEvaluationChange}
          ></textarea>

          {/* Evaluate button */}
          <button style={styles.evaluateButton} onClick={handleEvaluate}>
            Evaluate
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    margin: '40px auto',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  instruction: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  ruleList: {
    listStyleType: 'none',
    padding: 0,
  },
  ruleItem: {
    padding: '10px 15px',
    backgroundColor: '#3498DB',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
  },
  evaluationForm: {
    marginTop: '30px',
  },
  subHeading: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '10px',
    color: '#333',
  },
  subRuleList: {
    listStyleType: 'disc',
    padding: '10px 20px',
    marginBottom: '20px',
  },
  subRuleItem: {
    marginBottom: '5px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  evaluateButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EvaluateForm;
