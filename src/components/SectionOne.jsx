import React from 'react'
import { sectionOneFields } from '../assets/fieldConfig';

const SectionOne = ({formData, handleChange}) => {
  return (
    <div>
      
      {sectionOneFields.map((field) => (
        <div className="field" key={field.name}>
          <label className="label">{field.label}</label>
          <div className="control">
            {field.type === 'select' ? (
              <div className="select">
                <select name={field.name} value={formData[field.name]} onChange={handleChange}>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                className="input"
                type={field.type}
                placeholder={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}



export default SectionOne