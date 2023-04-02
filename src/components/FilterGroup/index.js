import './index.css'

const FilterGroup = props => {
  const renderSalaryRange = () => {
    const {salaryRangesList, onChangePackage} = props

    const onChangeRadio = event => {
      onChangePackage(event.target.value)
    }

    return (
      <div className="filterGroupCard">
        <h1 className="filterHeading">Salary Range</h1>
        <ul className="filterItemListContainer">
          {salaryRangesList.map(each => (
            <li className="filterItem" key={each.salaryRangeId}>
              <input
                type="radio"
                name="radioBtn"
                className="input"
                id={each.salaryRangeId}
                value={each.salaryRangeId}
                onChange={onChangeRadio}
              />
              <label htmlFor={each.salaryRangeId} className="label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderEmploymentType = () => {
    const {employmentTypesList, employmentInputChange} = props

    const onChangeEmploymentType = event => {
      employmentInputChange(event.target.value)
    }

    return (
      <div className="filterGroupCard">
        <h1 className="filterHeading">Type of Employment</h1>
        <ul className="filterItemListContainer">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="filterItem">
              <input
                type="checkbox"
                className="input"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                onChange={onChangeEmploymentType}
              />
              <label htmlFor={each.employmentTypeId} className="label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filterGroupContainer">
      {renderEmploymentType()}
      {renderSalaryRange()}
    </div>
  )
}
export default FilterGroup
