import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateDatabase from "./Manipulators/CreateDatabase"
import CreateFile from "./Manipulators/CreateFile"
import Delete from "./Manipulators/Delete"
import ReplaceInFile from "./Manipulators/ReplaceInFile"
import ScaffoldLaravel from "./Manipulators/ScaffoldLaravel"
import SetEnv from "./Manipulators/SetEnv"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
// Add your import here

const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateDatabase,
    CreateFile,
    Delete,
    ReplaceInFile,
    ScaffoldLaravel,
    SetEnv,
    ThrowBackEndError,
    // Add your manipulator here
};

export default AllManipulators;