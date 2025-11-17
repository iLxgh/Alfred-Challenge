import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("should render pagination with current page and total pages", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    expect(screen.getAllByText("Anterior").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Siguiente").length).toBeGreaterThan(0);
  });

  it("should not render when totalPages is 1 or less", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should call onPageChange when next button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getAllByText("Siguiente")[0];
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getAllByText("Anterior")[0];
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("should disable previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getAllByText("Anterior")[0];
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getAllByText("Siguiente")[0];
    expect(nextButton).toBeDisabled();
  });

  it("should disable buttons when loading", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
        loading={true}
      />
    );

    const nextButton = screen.getAllByText("Siguiente")[0];
    const prevButton = screen.getAllByText("Anterior")[0];

    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it("should call onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
