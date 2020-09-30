export const verifyFile = (file) => {
    const acceptedFileExtension = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    const { type } = file;

    if (acceptedFileExtension.includes(type)){
        return true;
    }

    return false;
}