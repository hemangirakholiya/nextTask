import axios from 'axios';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useReducer, useState } from 'react'
import styled from '@emotion/styled';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Sidebar from './sidebar';
import Navbar from './Navbar';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
}

const columnHelper = createColumnHelper<Product>()

const columns = [
    columnHelper.accessor('id', {
        header: 'Id',
    }),
    columnHelper.accessor('title', {
        cell: info => info.getValue(),
        header: 'Title',
    }),
    columnHelper.accessor('description', {
        cell: info => info.getValue(),
        header: 'Description',
    }),
    columnHelper.accessor('category', {
        header: 'Category',
    }),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('discountPercentage', {
        header: 'Discount',
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor('rating', {
        header: 'Rating',
    }),
    columnHelper.accessor('stock', {
        header: 'Stock',
    }),
    columnHelper.accessor('tags', {
        header: 'Tags',
    }),
    columnHelper.accessor('brand', {
        header: 'Brand',
    }),
]

const WebPage = styled.div`
    display:flex;
`
const Product = styled.div`
    margin-left:300px;
`

const Container = styled.div`
    padding: 1rem;
`

const StyledTable = styled.table`
    width: 100%;
    margin:auto;
    box-shadow:0px 3px 4px 0px rgba(0, 0, 0, 0.03);
    background-color:#fff;
    border-radius:10px;
    border-collapse: collapse;
    thead{
        background-color:rgba(0, 0, 0, .05)
    }
    tbody tr:hover{
        background-color:rgba(0, 0, 0, .05)  
    }
    td,th{    
        border-top: 1px solid #dee2e6;
    }     
`

const Th = styled.th`
    text-align: left;
    padding: 1rem;
`

const Td = styled.td`
    padding: 1rem;
`

const ViewButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #e9b102;
    color: white;
    border: none;
    cursor: pointer;
    font-size:12px;   
    border-radius: 5px;    
`

const PaginationContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 1rem;
`

const PaginationButton = styled.button`
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    background-color: ${props => props.disabled ? '#e9b102' : 'transparent'};
    color: ${props => props.disabled ? '#fff' : '#000'};
    border: 1px solid #e9b102;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    border-radius:5px;   
`
const PaginationButtons = styled.button`
    margin: 0 0.25rem;
    padding: 0.5rem 0.5rem;
    background-color: transparent;
    border:none;
    border: 1px solid #e9b102;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    border-radius:5px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
`

const ModalBox = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 700px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    position:relative;
`

const ReviewsSection = styled.div`
    margin-top: 1.5rem;
    h3{
        font-size:25px;
    }
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;  
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const CloseButton = styled(Button)`
    min-width:30px;
    min-height:30px;
    background-color: #e9b102;
    color: white;
    position:absolute;
    top:10px;
    right:10px;
    border-radius:50%;
    padding:0;   
`

interface ProductsTableProps {
    products: Product[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
    console.log("Products from props:", products);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [data, setData] = useState<Product[]>(products);
    console.log("Data state:", data);
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const rerender = useReducer(() => ({}), {})[1]

    // useEffect(() => {
    //     axios.get('https://dummyjson.com/products')
    //         .then(response => {
    //             setData(response.data.products)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error)
    //         })
    // }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const totalPages = Math.ceil(data?.length / rowsPerPage)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    const paginatedData = data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    const handleOpen = async (id: number) => {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setSelectedProduct(res.data);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <WebPage>
            <Sidebar />
            <Product>
                <Navbar />
                <Container>
                    <StyledTable>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <Th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </Th>
                                    ))}
                                    <Th style={{ width: '150px' }}>Action</Th>
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {paginatedData?.map((row, index) => (
                                <tr key={index}>
                                    {table.getRowModel().rows.map((tableRow) => (
                                        tableRow.original.id === row.id && tableRow.getVisibleCells().map(cell => (
                                            <Td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        ))
                                    ))}
                                    <Td><ViewButton onClick={() => handleOpen(row.id)}>View Review</ViewButton></Td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                    <PaginationContainer>
                        <PaginationButtons onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <KeyboardArrowLeftIcon />
                        </PaginationButtons>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationButton key={i + 1} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
                                {i + 1}
                            </PaginationButton>
                        ))}
                        <PaginationButtons onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <KeyboardArrowRightIcon />
                        </PaginationButtons>
                    </PaginationContainer>
                </Container>

                <Modal open={open} onClose={handleClose}>
                    <ModalContent>
                        <ModalBox>
                            {selectedProduct && (
                                <>
                                    <ReviewsSection>
                                        <h3>Reviews</h3>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <TableHeader>Rating</TableHeader>
                                                    <TableHeader>Comment</TableHeader>
                                                    <TableHeader>Date</TableHeader>
                                                    <TableHeader>Reviewer Email</TableHeader>
                                                    <TableHeader>Reviewer Name</TableHeader>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedProduct.reviews.map((review, index) => (
                                                    <tr key={index}>
                                                        <TableCell>{review.rating} stars</TableCell>
                                                        <TableCell>{review.comment}</TableCell>
                                                        <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                                                        <TableCell>{review.reviewerEmail}</TableCell>
                                                        <TableCell>{review.reviewerName}</TableCell>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </ReviewsSection>
                                    <CloseButton onClick={handleClose}><CloseIcon /></CloseButton>
                                </>
                            )}
                        </ModalBox>
                    </ModalContent>
                </Modal>
            </Product>
        </WebPage>
    );
};

export default ProductsTable;




