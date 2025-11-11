"use client";

import type { Category1, InterviewQuestion } from "@/types/portfolio";

import React from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

const STORAGE_KEY = "interview-favorites";

const ChevronDownIcon = ({ strokeWidth = 1.5, ...props }: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

const SearchIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const StarIcon = ({
  filled,
  ...props
}: {
  filled?: boolean;
  [key: string]: any;
}) => (
  <svg
    fill={filled ? "currentColor" : "none"}
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const category1Options: { name: string; uid: Category1 }[] = [
  { name: "General", uid: "General" },
  { name: "Infrastructure", uid: "Infrastructure" },
  { name: "Frontend", uid: "Frontend" },
  { name: "Backend", uid: "Backend" },
];

interface InterviewQATableProps {
  companyFilter?: string;
  questions: InterviewQuestion[];
  title?: string;
}

export function QATable({
  companyFilter: _companyFilter,
  questions,
  title: _title = "Interview Q&A",
}: InterviewQATableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] =
    React.useState<InterviewQuestion | null>(null);
  const [filterValue, setFilterValue] = React.useState("");
  const [category1Filter, setCategory1Filter] = React.useState<Set<string>>(
    new Set()
  );
  const [category2Filter, setCategory2Filter] = React.useState<Set<string>>(
    new Set()
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());
  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "id",
    direction: "ascending",
  });

  // Load favorites from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        setFavorites(new Set(parsed));
      } catch {
        // Failed to parse favorites, continue with empty set
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = React.useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  // Get unique category2 options based on selected category1
  const category2Options = React.useMemo(() => {
    const selectedCat1 = Array.from(category1Filter);
    const isAllSelected =
      selectedCat1.includes("all") || selectedCat1.length === 0;

    if (isAllSelected) {
      // Show all category2 options
      const allCat2 = new Set(questions.map((q) => q.category2));

      return Array.from(allCat2).map((cat2) => ({ name: cat2, uid: cat2 }));
    } else {
      // Filter category2 based on selected category1
      const filteredCat2 = new Set(
        questions
          .filter((q) => selectedCat1.includes(q.category1))
          .map((q) => q.category2)
      );

      return Array.from(filteredCat2).map((cat2) => ({
        name: cat2,
        uid: cat2,
      }));
    }
  }, [category1Filter, questions]);

  // Reset category2 filter when category1 changes
  React.useEffect(() => {
    setCategory2Filter(new Set());
  }, [category1Filter]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filtered = [...questions];

    // Search filter
    if (hasSearchFilter) {
      filtered = filtered.filter((q) =>
        q.question.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Category1 filter
    const selectedCat1 = Array.from(category1Filter);

    if (selectedCat1.length > 0) {
      filtered = filtered.filter((q) => selectedCat1.includes(q.category1));
    }

    // Category2 filter
    const selectedCat2 = Array.from(category2Filter);

    if (selectedCat2.length > 0) {
      filtered = filtered.filter((q) => selectedCat2.includes(q.category2));
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((q) => favorites.has(q.id));
    }

    return filtered;
  }, [
    questions,
    filterValue,
    category1Filter,
    category2Filter,
    showFavoritesOnly,
    favorites,
    hasSearchFilter,
  ]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof InterviewQuestion];
      const second = b[sortDescriptor.column as keyof InterviewQuestion];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const handleRowClick = React.useCallback(
    (question: InterviewQuestion) => {
      setSelectedQuestion(question);
      onOpen();
    },
    [onOpen]
  );

  const columns = [
    { name: "★", uid: "favorite", sortable: false },
    { name: "Question", uid: "question", sortable: true },
    { name: "Category 1", uid: "category1", sortable: true },
    { name: "Category 2", uid: "category2", sortable: true },
  ];

  const renderCell = React.useCallback(
    (question: InterviewQuestion, columnKey: React.Key) => {
      switch (columnKey) {
        case "favorite":
          return (
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(question.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  toggleFavorite(question.id);
                }
              }}
            >
              <Button isIconOnly size="sm" variant="light">
                <StarIcon
                  filled={favorites.has(question.id)}
                  style={{
                    color: favorites.has(question.id) ? "#f59e0b" : "#d1d5db",
                    fontSize: "20px",
                  }}
                />
              </Button>
            </div>
          );
        case "question":
          return (
            <div
              style={{ fontSize: "14px", color: "#2c3e50", lineHeight: "1.5" }}
            >
              {question.question}
            </div>
          );
        case "category1":
          return (
            <Chip
              color={
                question.category1 === "General"
                  ? "default"
                  : question.category1 === "Infrastructure"
                    ? "primary"
                    : question.category1 === "Frontend"
                      ? "secondary"
                      : "success"
              }
              size="sm"
              variant="flat"
            >
              {question.category1}
            </Chip>
          );
        case "category2":
          return (
            <div style={{ fontSize: "13px", color: "#7f8c8d" }}>
              {question.category2}
            </div>
          );
        default:
          return null;
      }
    },
    [favorites, toggleFavorite]
  );

  const topContent = React.useMemo(() => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            alignItems: "end",
            flexWrap: "wrap",
          }}
        >
          <Input
            isClearable
            placeholder="Search by question..."
            size="sm"
            startContent={<SearchIcon style={{ color: "#9ca3af" }} />}
            style={{ maxWidth: "400px" }}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon />}
                  size="sm"
                  style={{ minWidth: "120px" }}
                  variant="flat"
                >
                  {category1Filter.size > 0
                    ? `Category 1 (${category1Filter.size})`
                    : "Category 1"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                closeOnSelect={false}
                selectedKeys={category1Filter}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setCategory1Filter(keys as Set<string>)
                }
              >
                {category1Options.map((cat) => (
                  <DropdownItem key={cat.uid}>{cat.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon />}
                  size="sm"
                  style={{ minWidth: "150px" }}
                  variant="flat"
                >
                  {category2Filter.size > 0
                    ? `Category 2 (${category2Filter.size})`
                    : "Category 2"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                closeOnSelect={false}
                selectedKeys={category2Filter}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setCategory2Filter(keys as Set<string>)
                }
              >
                {category2Options.map((cat) => (
                  <DropdownItem key={cat.uid}>{cat.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              color={showFavoritesOnly ? "warning" : "default"}
              size="sm"
              variant={showFavoritesOnly ? "solid" : "flat"}
              onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <StarIcon
                filled={showFavoritesOnly}
                style={{ marginRight: "4px", fontSize: "16px" }}
              />
              Favorites Only
            </Button>
          </div>
        </div>
        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
          Total {sortedItems.length} questions
          {favorites.size > 0 && ` • ${favorites.size} favorited`}
        </div>
      </div>
    );
  }, [
    filterValue,
    category1Filter,
    category2Filter,
    category2Options,
    showFavoritesOnly,
    sortedItems.length,
    favorites.size,
    onSearchChange,
  ]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Interview Q&A table with filters and favorites"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={(descriptor) =>
          setSortDescriptor({
            column: String(descriptor.column),
            direction: descriptor.direction as "ascending" | "descending",
          })
        }
      >
        <TableHeader columns={columns}>
          {(column: { uid: string; sortable: boolean; name: string }) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "favorite" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No questions found" items={sortedItems}>
          {(item: InterviewQuestion) => (
            <TableRow
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(item)}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#2c3e50",
                  }}
                >
                  {selectedQuestion?.question}
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <Chip
                    color={
                      selectedQuestion?.category1 === "General"
                        ? "default"
                        : selectedQuestion?.category1 === "Infrastructure"
                          ? "primary"
                          : selectedQuestion?.category1 === "Frontend"
                            ? "secondary"
                            : "success"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {selectedQuestion?.category1}
                  </Chip>
                  <Chip color="default" size="sm" variant="bordered">
                    {selectedQuestion?.category2}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody>
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.8",
                    color: "#34495e",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedQuestion?.answer.split("\n").map((line, idx) => {
                    // Process markdown bold syntax **text**
                    const parts = line.split(/(\*\*.*?\*\*)/g);

                    return (
                      <React.Fragment key={idx}>
                        {parts.map((part, partIdx) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                              <strong key={partIdx}>{part.slice(2, -2)}</strong>
                            );
                          }

                          return (
                            <React.Fragment key={partIdx}>
                              {part}
                            </React.Fragment>
                          );
                        })}
                        {idx <
                          selectedQuestion.answer.split("\n").length - 1 && (
                          <br />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    if (selectedQuestion) {
                      toggleFavorite(selectedQuestion.id);
                    }
                  }}
                >
                  <StarIcon
                    filled={
                      selectedQuestion
                        ? favorites.has(selectedQuestion.id)
                        : false
                    }
                    style={{
                      marginRight: "4px",
                      color:
                        selectedQuestion && favorites.has(selectedQuestion.id)
                          ? "#f59e0b"
                          : "#d1d5db",
                    }}
                  />
                  {selectedQuestion && favorites.has(selectedQuestion.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Button>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
