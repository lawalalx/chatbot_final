
interface GenderCheckBoxProps {
  onCheckBoxChange: any
  selectGender: any
}

const GenderCheckBox = ({onCheckBoxChange, selectGender}: GenderCheckBoxProps) => {
  return (
    <div className="flex mt-2">
      <div className="form-control ">
        <label className={`cursor-pointer gap-2 label ${selectGender === "male" ? "selected": ""}`}>
          <span className="label-text text-white">Male</span>
          <input type="checkbox" className="checkbox border-slate-300" 
            checked={selectGender === "male"}
            onChange={()=> onCheckBoxChange("male")}
          />
        </label>
      </div>
    
      <div className="form-control ">
        <label className={`cursor-pointer gap-2 label ${selectGender === "female" ? "selected": ""}`}>
          <span className="label-text text-white">Female</span>
          <input type="checkbox" className="checkbox border-slate-300" 
          checked={selectGender === "female"}
          onChange={()=> onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckBox

// Starter Code

// const GenderCheckBox = () => {
//   return (
//     <div className="flex mt-2">
//       <div className="form-control ">
//         <label className="cursor-pointer gap-2 label">
//           <span className="label-text text-white">Male</span>
//           <input type="checkbox" className="checkbox border-slate-300" />
//         </label>
//       </div>
    
//       <div className="form-control ">
//         <label className="cursor-pointer gap-2 label">
//           <span className="label-text text-white">Female</span>
//           <input type="checkbox" className="checkbox border-slate-300" />
//         </label>
//       </div>
//     </div>
//   )
// }

// export default GenderCheckBox