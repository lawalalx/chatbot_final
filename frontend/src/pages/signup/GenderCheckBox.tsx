const GenderCheckBox = () => {
  return (
    <div className="flex mt-2">
      <div className="form-control ">
        <label className="cursor-pointer gap-2 label">
          <span className="label-text text-white">Male</span>
          <input type="checkbox" className="checkbox border-slate-300" />
        </label>
      </div>
    
      <div className="form-control ">
        <label className="cursor-pointer gap-2 label">
          <span className="label-text text-white">Female</span>
          <input type="checkbox" className="checkbox border-slate-300" />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckBox