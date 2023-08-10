import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private List<Integer> heap;
    private int x;

    public PowerOfTwoMaxHeap(int x) {
        this.x = x;
        this.heap = new ArrayList<>();
    }

    public void insert(int value) {
        heap.add(value);
        int currentIndex = heap.size() - 1;
        int parentIndex = (currentIndex - 1) / x;

        while (currentIndex > 0 && heap.get(currentIndex) > heap.get(parentIndex)) {
            int temp = heap.get(currentIndex);
            heap.set(currentIndex, heap.get(parentIndex));
            heap.set(parentIndex, temp);
            currentIndex = parentIndex;
            parentIndex = (currentIndex - 1) / x;
        }
    }

    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        int maxValue = heap.get(0);
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);

        int currentIndex = 0;
        int maxChildIndex = findMaxChildIndex(currentIndex);

        while (maxChildIndex != -1 && heap.get(currentIndex) < heap.get(maxChildIndex)) {
            int temp = heap.get(currentIndex);
            heap.set(currentIndex, heap.get(maxChildIndex));
            heap.set(maxChildIndex, temp);
            currentIndex = maxChildIndex;
            maxChildIndex = findMaxChildIndex(currentIndex);
        }

        return maxValue;
    }

    private int findMaxChildIndex(int parentIndex) {
        int maxChildIndex = -1;
        int startChildIndex = parentIndex * x + 1;
        int endChildIndex = Math.min(heap.size() - 1, parentIndex * x + x);

        for (int i = startChildIndex; i <= endChildIndex; i++) {
            if (heap.get(i) > heap.get(maxChildIndex)) {
                maxChildIndex = i;
            }
        }

        return maxChildIndex;
    }

    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2);
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        System.out.println("Max value: " + heap.popMax()); // Output: Max value: 20
        System.out.println("Max value: " + heap.popMax()); // Output: Max value: 10
    }
}
