
export const BookDetail = ({ 
    editable, 
    emptyForm 
}: { 
    editable: boolean;
    emptyForm: boolean;
     }) => {

  return (
    <>
    {editable && emptyForm && <p>CREATION</p>}
    {editable && !emptyForm && <p>EDITION</p>}
    {!editable && !emptyForm && <p>DISPLAY</p>}
    </>

    
  );
};

export default BookDetail;

