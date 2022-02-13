export const IndividualRegistration = ({handleReg}) => {
    return(
        <div>
            IndividualRegistration
            <p className="text-sm ml-2 hover:text-blue-500 cursor-pointer" onClick={() => handleReg(false)}>
            Go back to sign in?
          </p>
        </div>
    )
}

export default IndividualRegistration