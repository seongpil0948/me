"use client";

import type { Category1, InterviewQuestion } from "@/types/portfolio";
import type { Key, Selection } from "@heroui/react";

import React from "react";
import {
  Button,
  Chip,
  Dropdown,
  Modal,
  SearchField,
  Table,
} from "@heroui/react";

import { ChevronDownIcon, SearchIcon, StarIcon } from "./icons";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { QUIZ_STORAGE_KEYS } from "@/constants/quiz";

const STORAGE_KEY = QUIZ_STORAGE_KEYS.favorites;

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    React.useState<InterviewQuestion | null>(null);
  const [filterValue, setFilterValue] = React.useState("");
  const [category1Filter, setCategory1Filter] = React.useState<Set<string>>(
    new Set(),
  );
  const [category2Filter, setCategory2Filter] = React.useState<Set<string>>(
    new Set(),
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());

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
          .map((q) => q.category2),
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
        q.question.toLowerCase().includes(filterValue.toLowerCase()),
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
    return [...filteredItems].sort((a, b) => a.id - b.id);
  }, [filteredItems]);

  const handleRowClick = React.useCallback(
    (question: InterviewQuestion) => {
      setSelectedQuestion(question);
      setIsOpen(true);
    },
    [],
  );

  const getCategoryColor = (category: Category1) => {
    switch (category) {
      case "Infrastructure":
        return "accent" as const;
      case "Frontend":
        return "warning" as const;
      case "Backend":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

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
              <Button isIconOnly size="sm" variant="ghost">
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
            <Chip color={getCategoryColor(question.category1)} size="sm" variant="soft">
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
    [favorites, toggleFavorite],
  );

  const renderFilterTrigger = React.useCallback(
    (label: string, count: number, minWidth: string) => (
      <Dropdown.Trigger
        className="button button--sm button--secondary inline-flex items-center justify-between gap-2"
        style={{ minWidth }}
      >
        <span>{count > 0 ? `${label} (${count})` : label}</span>
        <ChevronDownIcon />
      </Dropdown.Trigger>
    ),
    [],
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
          <SearchField
            className="max-w-100"
            value={filterValue}
            onChange={setFilterValue}
          >
            <SearchField.Group>
              <SearchField.SearchIcon>
                <SearchIcon style={{ color: "#9ca3af" }} />
              </SearchField.SearchIcon>
              <SearchField.Input placeholder="Search by question..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Dropdown>
              {renderFilterTrigger("Category 1", category1Filter.size, "120px")}
              <Dropdown.Popover>
                <Dropdown.Menu
                  selectedKeys={category1Filter}
                  selectionMode="multiple"
                  onSelectionChange={(keys: Selection) =>
                    setCategory1Filter(
                      new Set(Array.from(keys as Set<Key>).map(String)),
                    )
                  }
                >
                  {category1Options.map((cat) => (
                    <Dropdown.Item key={cat.uid} id={cat.uid} textValue={cat.name}>
                      <Dropdown.ItemIndicator />
                      {cat.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Dropdown>
              {renderFilterTrigger("Category 2", category2Filter.size, "150px")}
              <Dropdown.Popover>
                <Dropdown.Menu
                  selectedKeys={category2Filter}
                  selectionMode="multiple"
                  onSelectionChange={(keys: Selection) =>
                    setCategory2Filter(
                      new Set(Array.from(keys as Set<Key>).map(String)),
                    )
                  }
                >
                  {category2Options.map((cat) => (
                    <Dropdown.Item key={cat.uid} id={cat.uid} textValue={cat.name}>
                      <Dropdown.ItemIndicator />
                      {cat.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <Button
              size="sm"
              variant={showFavoritesOnly ? "primary" : "secondary"}
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
    renderFilterTrigger,
  ]);

  return (
    <>
      {topContent}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Interview Q&A table with filters and favorites">
            <Table.Header>
              <Table.Column className="w-14" id="favorite" isRowHeader>
                ★
              </Table.Column>
              <Table.Column id="question">Question</Table.Column>
              <Table.Column id="category1">Category 1</Table.Column>
              <Table.Column id="category2">Category 2</Table.Column>
            </Table.Header>
            <Table.Body items={sortedItems}>
              {(item) => (
                <Table.Row
                  key={item.id}
                  className="cursor-pointer"
                  id={String(item.id)}
                  onAction={() => handleRowClick(item)}
                >
                  <Table.Cell>{renderCell(item, "favorite")}</Table.Cell>
                  <Table.Cell>{renderCell(item, "question")}</Table.Cell>
                  <Table.Cell>{renderCell(item, "category1")}</Table.Cell>
                  <Table.Cell>{renderCell(item, "category2")}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <Modal.Root>
        <Modal.Trigger>
          <span className="hidden" aria-hidden="true" />
        </Modal.Trigger>
        <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Container className="max-w-4xl">
            <Modal.Dialog>
              <Modal.Header className="flex flex-col gap-3">
                <div className="text-lg font-semibold text-slate-800">
                  {selectedQuestion?.question}
                </div>
                <div className="flex gap-2">
                  {selectedQuestion && (
                    <Chip color={getCategoryColor(selectedQuestion.category1)} size="sm" variant="soft">
                      {selectedQuestion.category1}
                    </Chip>
                  )}
                  {selectedQuestion?.category2 && (
                    <Chip color="default" size="sm" variant="secondary">
                      {selectedQuestion.category2}
                    </Chip>
                  )}
                </div>
              </Modal.Header>
              <Modal.Body>
                <MarkdownRenderer>{selectedQuestion?.answer ?? ""}</MarkdownRenderer>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="ghost"
                  onPress={() => {
                    if (selectedQuestion) {
                      toggleFavorite(selectedQuestion.id);
                    }
                  }}
                >
                  {selectedQuestion && favorites.has(selectedQuestion.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Button>
                <Button onPress={() => setIsOpen(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>
    </>
  );
}
