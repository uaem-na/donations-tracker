export const OrganizationRegistration = ({handleReg}) => {
    return(
        <div>
            OrganizationRegistration
            <p className="text-sm ml-2 hover:text-orange-500 cursor-pointer" onClick={() => handleReg(false)}>
            Go back to sign in?
          </p>
        </div>
    )
}

export default OrganizationRegistration