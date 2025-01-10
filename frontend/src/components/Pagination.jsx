import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const handlePageChange = (event, page) => {
    onChange(page);
  };

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <MuiPagination
        count={totalPages || 10}
        page={currentPage || 1}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
